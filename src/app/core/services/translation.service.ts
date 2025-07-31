import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ITranslationData {
	[key: string]: unknown;
}

@Injectable({
	providedIn: 'root',
})
export class TranslationService {
	private currentLanguage = 'en';
	private translationsSubject = new BehaviorSubject<ITranslationData>({});
	private translations: ITranslationData = {};
	private translationTrigger = 0;

	constructor(private http: HttpClient) {
		this.loadTranslations(this.currentLanguage);
	}

	/**
	 * Load translations for the specified language
	 */
	private loadTranslations(language: string): void {
		this.http
			.get<ITranslationData>(`/assets/i18n/${language}.json`)
			.pipe(
				catchError((error) => {
					console.warn(`Failed to load translations for language: ${language}`, error);
					return of({});
				}),
			)
			.subscribe((translations) => {
				this.translations = translations;
				this.translationsSubject.next(translations);
				this.translationTrigger++;
			});
	}

	/**
	 * Get translation for a key
	 */
	get(key: string, params?: Record<string, string | number>): string {
		const keys = key.split('.');
		let value: unknown = this.translations;

		for (const k of keys) {
			if (value && typeof value === 'object' && value !== null && k in value) {
				value = (value as Record<string, unknown>)[k];
			} else {
				return key; // Return key if translation not found
			}
		}

		if (typeof value !== 'string') {
			return key;
		}

		let result = value;

		// Replace parameters if provided
		if (params) {
			Object.keys(params).forEach((paramKey) => {
				result = result.replace(`{{${paramKey}}}`, String(params[paramKey]));
			});
		}

		return result;
	}

	/**
	 * Set the current language
	 */
	setLanguage(language: string): void {
		this.currentLanguage = language;
		this.loadTranslations(language);
	}

	/**
	 * Get the current language
	 */
	getCurrentLanguage(): string {
		return this.currentLanguage;
	}

	/**
	 * Get translation trigger for pipe updates
	 */
	getTranslationTrigger(): number {
		return this.translationTrigger;
	}
}
