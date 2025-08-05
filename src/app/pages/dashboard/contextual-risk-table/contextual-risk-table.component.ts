import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asset } from '../../../core/types';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';

@Component({
	selector: 'app-contextual-risk-table',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './contextual-risk-table.component.html',
	styleUrls: ['./contextual-risk-table.component.scss'],
})
export class ContextualRiskTableComponent {
	@Input() assets: Asset[] = [];
	@Input() currentPage: number = APP_CONSTANTS.PAGINATION.DEFAULT_CURRENT_PAGE;
	@Input() pageSize: number = APP_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE;
	@Output() pageChange = new EventEmitter<number>();

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
		return `Showing ${start}-${end} of ${this.assets.length}`;
	}

	onPageChange(page: number): void {
		this.pageChange.emit(page);
	}

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent): void {
		const target = event.target as HTMLElement;

		if (target.closest('.pagination')) {
			const buttons = target
				.closest('.pagination')
				?.querySelectorAll('button') as NodeListOf<HTMLElement>;
			const currentButton = target.closest('button') as HTMLElement;

			if (!buttons || !currentButton) return;

			const currentIndex = Array.from(buttons).findIndex((btn) => btn === currentButton);

			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault();
					if (currentIndex > 0) {
						buttons[currentIndex - 1]?.focus();
					}
					break;
				case 'ArrowRight':
					event.preventDefault();
					if (currentIndex < buttons.length - 1) {
						buttons[currentIndex + 1]?.focus();
					}
					break;
			}
		}
	}
}
