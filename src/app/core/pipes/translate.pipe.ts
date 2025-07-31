import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
	name: 'translate',
	standalone: true,
	pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
	private subscription = new Subscription();

	constructor(private translationService: TranslationService) {}

	transform(key: string, params?: Record<string, string | number>): string {
		// Trigger pipe update when translations change
		this.translationService.getTranslationTrigger();
		return this.translationService.get(key, params);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
