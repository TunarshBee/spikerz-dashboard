import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
	selector: 'app-language-switcher',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="language-switcher">
			<button
				class="lang-btn"
				[class.active]="currentLanguage === 'en'"
				(click)="switchLanguage('en')"
			>
				EN
			</button>
			<button
				class="lang-btn"
				[class.active]="currentLanguage === 'fr'"
				(click)="switchLanguage('fr')"
			>
				FR
			</button>
		</div>
	`,
	styles: [
		`
			.language-switcher {
				display: flex;
				gap: 8px;
				align-items: center;
			}

			.lang-btn {
				padding: 4px 8px;
				border: 1px solid var(--gray-200);
				background: var(--white);
				border-radius: 4px;
				cursor: pointer;
				font-size: 12px;
				font-weight: 500;
				transition: all 0.2s ease;
			}

			.lang-btn:hover {
				background: var(--gray-50);
			}

			.lang-btn.active {
				background: var(--primary-color);
				color: var(--white);
				border-color: var(--primary-color);
			}
		`,
	],
})
export class LanguageSwitcherComponent {
	currentLanguage: string = 'en';

	constructor(private translationService: TranslationService) {
		this.currentLanguage = this.translationService.getCurrentLanguage();
	}

	switchLanguage(language: string): void {
		this.currentLanguage = language;
		this.translationService.setLanguage(language);
	}
}
