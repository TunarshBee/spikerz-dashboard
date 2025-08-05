import {
	HttpInterceptorFn,
	HttpRequest,
	HttpHandlerFn,
	HttpErrorResponse,
	HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SecurityUtils } from '../utils/security.utils';

// Generate CSRF token once
const csrfToken: string = SecurityUtils.generateCsrfToken();

export const securityInterceptor: HttpInterceptorFn = (
	request: HttpRequest<unknown>,
	next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
	// Validate request URL
	if (!isValidUrl(request.url)) {
		return throwError(() => new Error('Invalid request URL'));
	}

	// Add security headers
	const secureRequest = request.clone({
		setHeaders: {
			'X-CSRF-Token': csrfToken,
			'X-Content-Type-Options': 'nosniff',
			'X-Frame-Options': 'DENY',
			'X-XSS-Protection': '1; mode=block',
			'Referrer-Policy': 'strict-origin-when-cross-origin',
			'Content-Security-Policy': getCspHeader(),
		},
	});

	// Validate request body for malicious content
	if (request.body) {
		const sanitizedBody = sanitizeRequestBody(request.body);
		if (sanitizedBody !== request.body) {
			const sanitizedRequest = secureRequest.clone({
				body: sanitizedBody,
			});
			return next(sanitizedRequest).pipe(catchError(handleError));
		}
	}

	return next(secureRequest).pipe(catchError(handleError));
};

/**
 * Validate if the URL is safe
 */
function isValidUrl(url: string): boolean {
	try {
		const urlObj = new URL(url, window.location.origin);

		// Only allow HTTP and HTTPS protocols
		if (!['http:', 'https:'].includes(urlObj.protocol)) {
			return false;
		}

		// Check for potentially dangerous patterns
		const dangerousPatterns = [/javascript:/i, /data:/i, /vbscript:/i, /file:/i];

		return !dangerousPatterns.some((pattern) => pattern.test(url));
	} catch {
		// Relative URLs are considered valid
		return true;
	}
}

/**
 * Sanitize request body to prevent injection attacks
 */
function sanitizeRequestBody(body: unknown): unknown {
	if (typeof body === 'string') {
		// Check for SQL injection and XSS
		if (SecurityUtils.detectSqlInjection(body) || SecurityUtils.detectXss(body)) {
			throw new Error('Malicious content detected in request body');
		}
		return SecurityUtils.sanitizeInput(body);
	}

	if (Array.isArray(body)) {
		return body.map((item) => sanitizeRequestBody(item));
	}

	if (body && typeof body === 'object') {
		const sanitized: Record<string, unknown> = {};
		for (const key in body) {
			if (Object.prototype.hasOwnProperty.call(body, key)) {
				const sanitizedKey = SecurityUtils.sanitizeInput(key);
				sanitized[sanitizedKey] = sanitizeRequestBody((body as Record<string, unknown>)[key]);
			}
		}
		return sanitized;
	}

	return body;
}

/**
 * Get Content Security Policy header
 */
function getCspHeader(): string {
	return [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com",
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
		"font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
		"img-src 'self' data: https:",
		"connect-src 'self'",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		'upgrade-insecure-requests',
	].join('; ');
}

/**
 * Handle HTTP errors with security considerations
 */
function handleError(error: HttpErrorResponse): Observable<never> {
	let errorMessage = 'An error occurred';

	if (error.error instanceof ErrorEvent) {
		// Client-side error
		errorMessage = `Client Error: ${error.error.message}`;
	} else {
		// Server-side error
		switch (error.status) {
			case 400:
				errorMessage = 'Bad Request - Invalid input provided';
				break;
			case 401:
				errorMessage = 'Unauthorized - Authentication required';
				break;
			case 403:
				errorMessage = 'Forbidden - Access denied';
				break;
			case 404:
				errorMessage = 'Not Found - Resource not available';
				break;
			case 429:
				errorMessage = 'Too Many Requests - Rate limit exceeded';
				break;
			case 500:
				errorMessage = 'Internal Server Error - Please try again later';
				break;
			default:
				errorMessage = `Server Error: ${error.status} - ${error.message}`;
		}
	}

	// Log security-relevant errors
	if (error.status === 403 || error.status === 401) {
		console.warn('Security alert: Unauthorized access attempt', {
			url: error.url,
			status: error.status,
			timestamp: new Date().toISOString(),
		});
	}

	return throwError(() => new Error(errorMessage));
}
