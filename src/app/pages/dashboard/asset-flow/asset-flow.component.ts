import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';

import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import {
	Asset,
	AssetCard,
	AssetFlowNode,
	RiskSummary,
	Vulnerability,
	AssetCardData,
	EndNodeCardData,
} from '../../../core/types';
import { Subscription } from 'rxjs';
import { VulnerabilityTagGridComponent } from './vulnerability-tag-grid/vulnerability-tag-grid.component';
import { AssetCardComponent } from './asset-card/asset-card.component';
import { EndNodeCardComponent } from './end-node-card/end-node-card.component';
import { DashboardService } from '../../../core/services/dashboard.service';
import {
	RISK_LEVELS,
	ASSET_CARD_STATUS,
	HIGHLIGHT_COLORS,
} from '../../../core/constants/risk.constants';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';

@Component({
	selector: 'app-asset-flow',
	imports: [
		CommonModule,
		CardComponent,
		VulnerabilityTagGridComponent,
		AssetCardComponent,
		EndNodeCardComponent,
		TranslatePipe,
	],
	templateUrl: './asset-flow.component.html',
	styleUrl: './asset-flow.component.scss',
})
export class AssetFlowComponent implements OnInit, OnDestroy {
	assetFlow = signal<AssetFlowNode[]>([]);
	assets = signal<Asset[]>([]);
	riskSummary = signal<RiskSummary>({
		critical: 0,
		high: 0,
		medium: 0,
		low: 0,
		total: 0,
	});
	showEntryHover = false;
	hoveredMiddleNode: string | null = null;
	hoveredEndNode: string | null = null;

	middleNodeAssets: { [key: string]: AssetCardData } = {
		'2': {
			name: 'WebServer-Prod-01',
			ipAddress: '192.168.1.3',
			icon: 'server',
			status: ASSET_CARD_STATUS.NORMAL,
			metadata: [
				{ label: 'Lorem', value: 'Lorem "Ipsum"', highlight: HIGHLIGHT_COLORS.YELLOW },
				{ label: 'Loremipsum', value: 'Lorem 1234,5678', highlight: HIGHLIGHT_COLORS.BLUE },
			],
		},
		'3': {
			name: 'Database-Main',
			ipAddress: '192.168.1.4',
			icon: 'server',
			status: ASSET_CARD_STATUS.ERROR,
			metadata: [
				{ label: 'Lorem', value: 'Lorem "Ipsum"', highlight: HIGHLIGHT_COLORS.YELLOW },
				{ label: 'Loremipsum', value: 'Lorem 1234,5678', highlight: HIGHLIGHT_COLORS.BLUE },
			],
		},
	};

	endNodeAssets: { [key: string]: EndNodeCardData } = {
		'4': {
			name: 'Loremipsum',
			ipAddress: '1.2.3.4',
			icon: 'server',
			status: ASSET_CARD_STATUS.ERROR,
			metadata: [
				{ label: 'Lorem', value: 'Lorem "Ipsum"', highlight: HIGHLIGHT_COLORS.YELLOW },
				{ value: 'Lorem', highlight: HIGHLIGHT_COLORS.GREEN },
				{ value: 'Loremipsum Loremipsum' },
				{ value: '1.2.3.4', highlight: HIGHLIGHT_COLORS.PURPLE },
				{ value: 'Loremipsum' },
				{ value: '1.2.3.4', highlight: HIGHLIGHT_COLORS.PURPLE },
				{ value: '1.2.3.4', highlight: HIGHLIGHT_COLORS.PURPLE },
				{ value: 'Lorem 1234,5678', highlight: HIGHLIGHT_COLORS.BLUE },
			],
		},
		'5': {
			name: 'Loremipsum',
			ipAddress: '1.2.3.4',
			icon: 'server',
			status: ASSET_CARD_STATUS.ERROR,
			metadata: [
				{ label: 'Lorem', value: 'Lorem "Ipsum"', highlight: HIGHLIGHT_COLORS.YELLOW },
				{ value: 'Loremipsum Loremipsum' },
				{ value: '1.2.3.4', highlight: HIGHLIGHT_COLORS.PURPLE },
				{ value: '1.2.3.4', highlight: HIGHLIGHT_COLORS.PURPLE },
				{ value: 'Loremipsum Loremipsum' },
				{ value: '1.2.3.4', highlight: HIGHLIGHT_COLORS.PURPLE },
				{ value: '1.2.3.4', highlight: HIGHLIGHT_COLORS.PURPLE },
			],
		},
	};

	riskLegend = [
		{
			icon: APP_CONSTANTS.ICONS.ERROR_SHIELD,
			status: RISK_LEVELS.CRITICAL,
			label: 'Lorem',
		},
		{
			icon: APP_CONSTANTS.ICONS.WARNING_SHIELD,
			status: RISK_LEVELS.HIGH,
			label: 'Lorem',
		},
		{
			icon: APP_CONSTANTS.ICONS.SUCCESS_SHIELD,
			status: RISK_LEVELS.LOW,
			label: 'Lorem',
		},
	];
	vulnerabilities = signal<Vulnerability[]>([]);
	assetCards = signal<AssetCard[]>([]);
	private subscriptions = new Subscription();

	constructor(private dashboardService: DashboardService) {}
	ngOnInit(): void {
		this.loadData();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
	private loadData(): void {
		this.subscriptions.add(
			this.dashboardService.getAssetFlow().subscribe((data) => {
				this.assetFlow.set(data);
			}),
		);

		this.subscriptions.add(
			this.dashboardService.getVulnerabilities().subscribe((data) => {
				this.vulnerabilities.set(data);
			}),
		);

		this.subscriptions.add(
			this.dashboardService.getAssetCards().subscribe((data) => {
				this.assetCards.set(data);
			}),
		);
	}
}
