import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityUtils } from '../utils/security.utils';

export interface ISecurityValidationResult {
	isValid: boolean;
	errors: string[];
	sanitizedValue?: unknown;
}

@Injectable({
	providedIn: 'root',
})
export class SecurityService {
	constructor(private sanitizer: DomSanitizer) {}

	/**
	 * Validate and sanitize user input
	 */
	validateInput(
		input: string,
		type: 'text' | 'email' | 'ip' | 'number' | 'alphanumeric' = 'text',
	): ISecurityValidationResult {
		const errors: string[] = [];

		if (!input) {
			return { isValid: false, errors: ['Input is required'] };
		}

		// Check for malicious patterns
		if (SecurityUtils.detectXss(input)) {
			errors.push('XSS attack pattern detected');
		}

		if (SecurityUtils.detectSqlInjection(input)) {
			errors.push('SQL injection pattern detected');
		}

		// Type-specific validation
		switch (type) {
			case 'email': {
				if (!SecurityUtils.validateEmail(input)) {
					errors.push('Invalid email format');
				}
				break;
			}
			case 'ip': {
				if (!SecurityUtils.validateIpAddress(input)) {
					errors.push('Invalid IP address format');
				}
				break;
			}
			case 'number': {
				const number = SecurityUtils.sanitizeNumber(input);
				if (number === null) {
					errors.push('Invalid number format');
				}
				break;
			}
			case 'alphanumeric': {
				if (input.length > 100) {
					errors.push('Input too long (max 100 characters)');
				}
				break;
			}
			case 'text':
			default: {
				if (input.length > 1000) {
					errors.push('Input too long (max 1000 characters)');
				}
				break;
			}
		}

		const isValid = errors.length === 0;
		let sanitizedValue: unknown = input;

		if (isValid) {
			switch (type) {
				case 'email':
					sanitizedValue = input.toLowerCase().trim();
					break;
				case 'ip':
					sanitizedValue = input.trim();
					break;
				case 'number':
					sanitizedValue = SecurityUtils.sanitizeNumber(input);
					break;
				case 'alphanumeric':
					sanitizedValue = SecurityUtils.sanitizeAlphanumeric(input);
					break;
				case 'text':
				default:
					sanitizedValue = SecurityUtils.sanitizeInput(input);
					break;
			}
		}

		return {
			isValid,
			errors,
			sanitizedValue: isValid ? sanitizedValue : undefined,
		};
	}

	/**
	 * Validate and sanitize object properties
	 */
	validateObject(obj: Record<string, unknown>): ISecurityValidationResult {
		const errors: string[] = [];
		const sanitizedObj: Record<string, unknown> = {};

		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const value = obj[key];
				const sanitizedKey = SecurityUtils.sanitizeInput(key);

				if (typeof value === 'string') {
					const validation = this.validateInput(value);
					if (!validation.isValid) {
						errors.push(...validation.errors);
					} else {
						sanitizedObj[sanitizedKey] = validation.sanitizedValue;
					}
				} else if (Array.isArray(value)) {
					sanitizedObj[sanitizedKey] = value.map((item) => {
						if (typeof item === 'string') {
							return SecurityUtils.sanitizeInput(item);
						}
						return item;
					});
				} else if (value && typeof value === 'object') {
					const nestedValidation = this.validateObject(value as Record<string, unknown>);
					if (!nestedValidation.isValid) {
						errors.push(...nestedValidation.errors);
					} else {
						sanitizedObj[sanitizedKey] = nestedValidation.sanitizedValue;
					}
				} else {
					sanitizedObj[sanitizedKey] = value;
				}
			}
		}

		return {
			isValid: errors.length === 0,
			errors,
			sanitizedValue: errors.length === 0 ? sanitizedObj : undefined,
		};
	}

	/**
	 * Validate and sanitize array
	 */
	validateArray(arr: unknown[]): ISecurityValidationResult {
		const errors: string[] = [];

		if (!Array.isArray(arr)) {
			return { isValid: false, errors: ['Invalid array'] };
		}

		if (arr.length > 1000) {
			return { isValid: false, errors: ['Array too large (max 1000 items)'] };
		}

		const sanitizedArray: unknown[] = [];

		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			if (typeof item === 'string') {
				const validation = this.validateInput(item, 'text');
				if (!validation.isValid) {
					errors.push(`Invalid string at index ${i}: ${validation.errors.join(', ')}`);
					continue;
				}
				sanitizedArray.push(validation.sanitizedValue);
			} else if (Array.isArray(item)) {
				const validation = this.validateArray(item);
				if (!validation.isValid) {
					errors.push(`Invalid nested array at index ${i}: ${validation.errors.join(', ')}`);
					continue;
				}
				sanitizedArray.push(validation.sanitizedValue);
			} else if (item && typeof item === 'object' && item !== null) {
				const validation = this.validateObject(item as Record<string, unknown>);
				if (!validation.isValid) {
					errors.push(`Invalid object at index ${i}: ${validation.errors.join(', ')}`);
					continue;
				}
				sanitizedArray.push(validation.sanitizedValue);
			} else {
				sanitizedArray.push(item);
			}
		}

		return {
			isValid: errors.length === 0,
			errors,
			sanitizedValue: errors.length === 0 ? sanitizedArray : undefined,
		};
	}

	/**
	 * Validate file upload
	 */
	validateFileUpload(
		file: File,
		allowedTypes: string[] = [],
		maxSize: number = 10 * 1024 * 1024,
	): ISecurityValidationResult {
		const errors: string[] = [];

		if (!file) {
			return { isValid: false, errors: ['No file provided'] };
		}

		// Check file size
		if (file.size > maxSize) {
			errors.push(`File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`);
		}

		// Check file type if allowedTypes is specified
		if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
			errors.push(`File type ${file.type} is not allowed`);
		}

		// Check for potentially dangerous file extensions
		const dangerousExtensions = ['.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js'];
		const fileName = file.name.toLowerCase();
		if (dangerousExtensions.some((ext) => fileName.endsWith(ext))) {
			errors.push('Potentially dangerous file type detected');
		}

		return {
			isValid: errors.length === 0,
			errors,
			sanitizedValue: errors.length === 0 ? file : undefined,
		};
	}

	/**
	 * Sanitize HTML content
	 */
	sanitizeHtml(content: string) {
		return SecurityUtils.sanitizeHtml(this.sanitizer, content);
	}

	/**
	 * Sanitize URL
	 */
	sanitizeUrl(url: string) {
		return SecurityUtils.sanitizeUrl(this.sanitizer, url);
	}

	/**
	 * Sanitize CSS style
	 */
	sanitizeStyle(style: string) {
		return SecurityUtils.sanitizeStyle(this.sanitizer, style);
	}

	/**
	 * Generate secure random token
	 */
	generateSecureToken(): string {
		return SecurityUtils.generateCsrfToken();
	}

	/**
	 * Log security event
	 */
	logSecurityEvent(event: string, details: Record<string, unknown> = {}) {
		console.warn('Security Event:', {
			event,
			details,
			timestamp: new Date().toISOString(),
			userAgent:
				typeof window !== 'undefined' && window.navigator ? window.navigator.userAgent : 'Unknown',
		});
	}
}
