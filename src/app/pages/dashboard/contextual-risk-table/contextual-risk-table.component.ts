import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asset } from '../../../core/types';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
	selector: 'app-contextual-risk-table',
	standalone: true,
	imports: [CommonModule, TranslatePipe],
	templateUrl: './contextual-risk-table.component.html',
	styleUrls: ['./contextual-risk-table.component.scss'],
})
export class ContextualRiskTableComponent {
	@Input() assets: Asset[] = [];
	@Input() currentPage: number = APP_CONSTANTS.PAGINATION.DEFAULT_CURRENT_PAGE;
	@Input() pageSize: number = APP_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE;
	@Output() pageChange = new EventEmitter<number>();

	constructor(private translationService: TranslationService) {}

	get paginatedAssets(): Asset[] {
		const startIndex = (this.currentPage - 1) * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		return this.assets.slice(startIndex, endIndex);
	}

	get totalPages(): number {
		return Math.ceil(this.assets.length / this.pageSize);
	}

	get pageInfo(): string {
		const start = (this.currentPage - 1) * this.pageSize + 1;
		const end = Math.min(this.currentPage * this.pageSize, this.assets.length);
		return this.translationService.get('dashboard.pagination.showing', {
			start,
			end,
			total: this.assets.length,
		});
	}

	onPageChange(page: number): void {
		this.pageChange.emit(page);
	}
}
