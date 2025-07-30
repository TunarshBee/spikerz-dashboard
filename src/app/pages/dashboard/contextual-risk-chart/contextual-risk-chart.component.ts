import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskSummary } from '../../../core/types';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';
import { RISK_LEVELS, RISK_COLORS } from '../../../core/constants/risk.constants';

@Component({
	selector: 'app-contextual-risk-chart',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './contextual-risk-chart.component.html',
	styleUrls: ['./contextual-risk-chart.component.scss'],
})
export class ContextualRiskChartComponent {
	riskSummary = input<RiskSummary>({
		critical: 0,
		high: 0,
		medium: 0,
		low: 0,
		total: 0,
	});

	total = 0;
	segments: { percent: number; offset: number; colorClass: string }[] = [];

	chartViewBoxSize = APP_CONSTANTS.CHART.VIEW_BOX_SIZE;
	chartCenter = APP_CONSTANTS.CHART.CENTER_POINT;
	chartRadius = APP_CONSTANTS.CHART.RADIUS;
	chartTextY = APP_CONSTANTS.CHART.TEXT_Y_OFFSET;

	ngOnInit(): void {
		const data = this.riskSummary();
		this.total = this.getTotal();

		let offset = 0;
		this.segments = [];

		const parts = [
			{ value: data.critical, class: RISK_COLORS.CRITICAL },
			{ value: data.high, class: RISK_COLORS.HIGH },
			{ value: data.medium, class: RISK_COLORS.MEDIUM },
			{ value: data.low, class: RISK_COLORS.LOW },
		];

		for (const part of parts) {
			const percent =
				this.total === 0 ? 0 : (part.value / this.total) * APP_CONSTANTS.CHART.VIEW_BOX_SIZE;
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
			{
				level: RISK_LEVELS.CRITICAL,
				count: this.riskSummary()?.critical,
				color: RISK_COLORS.CRITICAL,
			},
			{ level: RISK_LEVELS.HIGH, count: this.riskSummary()?.high, color: RISK_COLORS.HIGH },
			{ level: RISK_LEVELS.MEDIUM, count: this.riskSummary()?.medium, color: RISK_COLORS.MEDIUM },
			{ level: RISK_LEVELS.LOW, count: this.riskSummary()?.low, color: RISK_COLORS.LOW },
		];
	}
}
