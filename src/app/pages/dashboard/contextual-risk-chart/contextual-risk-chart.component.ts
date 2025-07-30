import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRiskSummary } from '../../../core/interfaces/asset.interface';

@Component({
	selector: 'app-contextual-risk-chart',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './contextual-risk-chart.component.html',
	styleUrls: ['./contextual-risk-chart.component.scss'],
})
export class ContextualRiskChartComponent {
	riskSummary = input<IRiskSummary>({
		critical: 0,
		high: 0,
		medium: 0,
		low: 0,
		total: 0,
	});

	total = 0;
	segments: { percent: number; offset: number; colorClass: string }[] = [];

	ngOnInit(): void {
		const data = this.riskSummary();
		this.total = this.getTotal();

		let offset = 0;
		this.segments = [];

		const parts = [
			{ value: data.critical, class: 'critical' },
			{ value: data.high, class: 'high' },
			{ value: data.medium, class: 'medium' },
			{ value: data.low, class: 'low' },
		];

		for (const part of parts) {
			const percent = this.total === 0 ? 0 : (part.value / this.total) * 100;
			this.segments.push({
				percent,
				offset,
				colorClass: part.class,
			});
			offset += percent;
		}
	}

	getTotal(): number {
		const data = this.riskSummary();
		return data?.critical + data?.high + data?.medium + data?.low || 0;
	}
	get riskStats() {
		return [
			{ level: 'Critical', count: this.riskSummary()?.critical, color: 'critical' },
			{ level: 'High', count: this.riskSummary()?.high, color: 'high' },
			{ level: 'Medium', count: this.riskSummary()?.medium, color: 'medium' },
			{ level: 'Low', count: this.riskSummary()?.low, color: 'low' },
		];
	}
}
