import { DomSanitizer, SafeHtml, SafeUrl, SafeStyle } from '@angular/platform-browser';

export class SecurityUtils {
	/**
	 * Sanitize HTML content to prevent XSS attacks
	 */
	static sanitizeHtml(sanitizer: DomSanitizer, content: string): SafeHtml {
		if (!content) return '';

		// Remove potentially dangerous HTML tags and attributes
		const sanitized = content
			.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
			.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
			.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
			.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
			.replace(/javascript:/gi, '')
			.replace(/on\w+\s*=/gi, '')
			.replace(/data:/gi, '')
			.replace(/vbscript:/gi, '');

		return sanitizer.bypassSecurityTrustHtml(sanitized);
	}

	/**
	 * Sanitize URL to prevent XSS and injection attacks
	 */
	static sanitizeUrl(sanitizer: DomSanitizer, url: string): SafeUrl {
		if (!url) return '';

		// Only allow http, https, and relative URLs
		const allowedProtocols = /^(https?:\/\/|\/|\.\/|\.\.\/)/;
		if (!allowedProtocols.test(url)) {
			return '';
		}

		// Remove potentially dangerous protocols
		const sanitized = url
			.replace(/javascript:/gi, '')
			.replace(/data:/gi, '')
			.replace(/vbscript:/gi, '');

		return sanitizer.bypassSecurityTrustUrl(sanitized);
	}

	/**
	 * Sanitize CSS to prevent CSS injection attacks
	 */
	static sanitizeStyle(sanitizer: DomSanitizer, style: string): SafeStyle {
		if (!style) return '';

		// Remove potentially dangerous CSS expressions
		const sanitized = style
			.replace(/expression\s*\(/gi, '')
			.replace(/url\s*\(\s*['"]?\s*javascript:/gi, '')
			.replace(/url\s*\(\s*['"]?\s*data:/gi, '');

		return sanitizer.bypassSecurityTrustStyle(sanitized);
	}

	/**
	 * Validate and sanitize user input
	 */
	static sanitizeInput(input: string): string {
		if (!input) return '';

		return input
			.replace(/[<>]/g, '') // Remove angle brackets
			.replace(/javascript:/gi, '')
			.replace(/on\w+\s*=/gi, '')
			.replace(/data:/gi, '')
			.replace(/vbscript:/gi, '')
			.trim();
	}

	/**
	 * Validate email format
	 */
	static validateEmail(email: string): boolean {
		if (!email) return false;

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	}

	/**
	 * Validate IP address format
	 */
	static validateIpAddress(ip: string): boolean {
		if (!ip) return false;

		const ipRegex =
			/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		return ipRegex.test(ip);
	}

	/**
	 * Generate CSRF token
	 */
	static generateCsrfToken(): string {
		const array = new Uint8Array(32);
		if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
			window.crypto.getRandomValues(array);
		} else {
			// Fallback for environments without crypto API
			for (let i = 0; i < array.length; i++) {
				array[i] = Math.floor(Math.random() * 256);
			}
		}
		return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
	}

	/**
	 * Validate file upload
	 */
	static validateFileUpload(file: File, allowedTypes: string[], maxSize: number): boolean {
		if (!file) return false;

		// Check file type
		if (!allowedTypes.includes(file.type)) {
			return false;
		}

		// Check file size
		if (file.size > maxSize) {
			return false;
		}

		return true;
	}

	/**
	 * Escape HTML entities
	 */
	static escapeHtml(text: string): string {
		if (!text) return '';

		const htmlEntities: { [key: string]: string } = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		};

		return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
	}

	/**
	 * Validate and sanitize JSON input
	 */
	static sanitizeJson(input: string): unknown {
		try {
			const parsed = JSON.parse(input);

			// Recursively sanitize object properties
			const sanitizeObject = (obj: unknown): unknown => {
				if (typeof obj === 'string') {
					return this.sanitizeInput(obj);
				} else if (Array.isArray(obj)) {
					return obj.map(sanitizeObject);
				} else if (obj && typeof obj === 'object') {
					const sanitized: Record<string, unknown> = {};
					for (const key in obj) {
						if (Object.prototype.hasOwnProperty.call(obj, key)) {
							sanitized[this.sanitizeInput(key)] = sanitizeObject(
								(obj as Record<string, unknown>)[key],
							);
						}
					}
					return sanitized;
				}
				return obj;
			};

			return sanitizeObject(parsed);
		} catch {
			throw new Error('Invalid JSON input');
		}
	}

	/**
	 * Check for SQL injection patterns
	 */
	static detectSqlInjection(input: string): boolean {
		if (!input) return false;

		const sqlPatterns = [
			/\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b/i,
			/['"]\s*(union|select|insert|update|delete|drop|create|alter|exec|execute)\b/i,
			/;\s*(union|select|insert|update|delete|drop|create|alter|exec|execute)\b/i,
			/--\s*$/,
			/\/\*.*\*\//,
			/@@version/i,
			/@@servername/i,
			/xp_cmdshell/i,
			/sp_executesql/i,
		];

		return sqlPatterns.some((pattern) => pattern.test(input));
	}

	/**
	 * Check for XSS patterns
	 */
	static detectXss(input: string): boolean {
		if (!input) return false;

		const xssPatterns = [
			/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			/javascript:/gi,
			/on\w+\s*=/gi,
			/data:text\/html/gi,
			/data:application\/javascript/gi,
			/expression\s*\(/gi,
			/url\s*\(\s*['"]?\s*javascript:/gi,
		];

		return xssPatterns.some((pattern) => pattern.test(input));
	}

	/**
	 * Validate and sanitize numeric input
	 */
	static sanitizeNumber(input: string): number | null {
		if (!input) return null;

		const sanitized = input.replace(/[^0-9.-]/g, '');
		const number = parseFloat(sanitized);

		return isNaN(number) ? null : number;
	}

	/**
	 * Validate and sanitize alphanumeric input
	 */
	static sanitizeAlphanumeric(input: string): string {
		if (!input) return '';

		return input.replace(/[^a-zA-Z0-9\s]/g, '').trim();
	}
}
