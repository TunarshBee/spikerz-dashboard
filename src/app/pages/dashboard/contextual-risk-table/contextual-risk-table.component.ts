import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAsset } from '../../../core/interfaces/asset.interface';
import { IconUtils } from '../../../core/utils/icon.utils';

@Component({
  selector: 'app-contextual-risk-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contextual-risk-table.component.html',
  styleUrls: ['./contextual-risk-table.component.scss']
})
export class ContextualRiskTableComponent {
  @Input() assets: IAsset[] = [];
  @Input() currentPage = 1;
  @Input() pageSize = 2;
  @Output() pageChange = new EventEmitter<number>();

  get paginatedAssets(): IAsset[] {
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

  getIconClass(icon: string): string {
    return IconUtils.getIconClass(icon);
  }

  getRiskLevelColor(level: string): string {
    return IconUtils.getRiskLevelColor(level);
  }
} 