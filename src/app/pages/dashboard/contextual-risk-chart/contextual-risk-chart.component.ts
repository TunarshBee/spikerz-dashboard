import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asset, RiskSummary } from '../../../core/types';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';
import { RISK_LEVELS, RISK_COLORS } from '../../../core/constants/risk.constants';

@Component({
	selector: 'app-contextual-risk-chart',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './contextual-risk-chart.component.html',
	styleUrls: ['./contextual-risk-chart.component.scss'],
})
export class ContextualRiskChartComponent implements OnInit {
	assets = input<Asset[]>([]);

	total = 0;
	segments: { percent: number; offset: number; colorClass: string }[] = [];

	chartViewBoxSize = APP_CONSTANTS.CHART.VIEW_BOX_SIZE;
	chartCenter = APP_CONSTANTS.CHART.CENTER_POINT;
	chartRadius = APP_CONSTANTS.CHART.RADIUS;
	chartTextY = APP_CONSTANTS.CHART.TEXT_Y_OFFSET;

	ngOnInit(): void {
		this.calculateRiskSummary();
	}

	private calculateRiskSummary(): void {
		const assets = this.assets();
		const riskSummary: RiskSummary = {
			critical: 0,
			high: 0,
			medium: 0,
			low: 0,
			total: assets.length,
		};

		assets.forEach((asset) => {
			const riskLevel = asset.riskLevel.toLowerCase();
			switch (riskLevel) {
				case 'critical':
					riskSummary.critical++;
					break;
				case 'high':
					riskSummary.high++;
					break;
				case 'medium':
					riskSummary.medium++;
					break;
				case 'low':
					riskSummary.low++;
					break;
			}
		});

		this.total = riskSummary.total;
		this.calculateSegments(riskSummary);
	}

	private calculateSegments(riskSummary: RiskSummary): void {
		let offset = 0;
		this.segments = [];

		const parts = [
			{ value: riskSummary.critical, class: RISK_COLORS.CRITICAL },
			{ value: riskSummary.high, class: RISK_COLORS.HIGH },
			{ value: riskSummary.medium, class: RISK_COLORS.MEDIUM },
			{ value: riskSummary.low, class: RISK_COLORS.LOW },
		];

		const nonZeroParts = parts.filter((part) => part.value > 0);

		if (nonZeroParts.length === 0) {
			for (const part of parts) {
				this.segments.push({
					percent: 0,
					offset: 0,
					colorClass: part.class,
				});
			}
			return;
		}

		const totalNonZero = nonZeroParts.reduce((sum, part) => sum + part.value, 0);

		for (const part of nonZeroParts) {
			const percent = (part.value / totalNonZero) * 100;
			this.segments.push({
				percent,
				offset,
				colorClass: part.class,
			});
			offset += percent;
		}
	}

	get riskStats() {
		const assets = this.assets();
		const riskSummary: RiskSummary = {
			critical: 0,
			high: 0,
			medium: 0,
			low: 0,
			total: assets.length,
		};

		assets.forEach((asset) => {
			const riskLevel = asset.riskLevel.toLowerCase();
			switch (riskLevel) {
				case 'critical':
					riskSummary.critical++;
					break;
				case 'high':
					riskSummary.high++;
					break;
				case 'medium':
					riskSummary.medium++;
					break;
				case 'low':
					riskSummary.low++;
					break;
			}
		});

		return [
			{
				level: RISK_LEVELS.CRITICAL,
				count: riskSummary.critical,
				color: RISK_COLORS.CRITICAL,
			},
			{ level: RISK_LEVELS.HIGH, count: riskSummary.high, color: RISK_COLORS.HIGH },
			{ level: RISK_LEVELS.MEDIUM, count: riskSummary.medium, color: RISK_COLORS.MEDIUM },
			{ level: RISK_LEVELS.LOW, count: riskSummary.low, color: RISK_COLORS.LOW },
		];
	}
}
