import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SecurityUtils } from '../utils/security.utils';

@Pipe({
	name: 'secure',
	standalone: true,
})
export class SecurePipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}

	transform(
		value: string | null | undefined,
		type: 'html' | 'text' | 'url' = 'text',
	): SafeHtml | string {
		if (!value) return '';

		switch (type) {
			case 'html':
				return SecurityUtils.sanitizeHtml(this.sanitizer, value);
			case 'url':
				return SecurityUtils.sanitizeUrl(this.sanitizer, value) as string;
			case 'text':
			default:
				return SecurityUtils.escapeHtml(value);
		}
	}
}
