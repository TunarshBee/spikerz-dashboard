import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CardComponent } from '../../shared/components/ui/card/card.component';

import {
	Asset,
	Vulnerability,
	RiskSummary,
	AssetCard,
	CVE,
	SidebarItem,
	UserProfile,
} from '../../core/types';
import { DashboardService } from '../../core/services/dashboard.service';
import { LayoutService } from '../../core/services/layout.service';
import { RemediationComponent } from '../../shared/components/ui/remediation/remediation.component';
import { AssetFlowComponent } from './asset-flow/asset-flow.component';
import { ContextualRiskTableComponent } from './contextual-risk-table/contextual-risk-table.component';
import { ContextualRiskChartComponent } from './contextual-risk-chart/contextual-risk-chart.component';
import { APP_CONSTANTS } from '../../core/constants/app.constants';
import { DASHBOARD_CONSTANTS } from '../../core/constants/dashboard.constants';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [
		CommonModule,
		SidebarComponent,
		CardComponent,
		RemediationComponent,
		AssetFlowComponent,
		ContextualRiskTableComponent,
		ContextualRiskChartComponent,
	],
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
	sidebarItems: SidebarItem[] = DASHBOARD_CONSTANTS.SIDEBAR_ITEMS;
	remediations = DASHBOARD_CONSTANTS.REMEDIATIONS;
	userProfile: UserProfile = DASHBOARD_CONSTANTS.USER_PROFILE;
	currentCVE: CVE = DASHBOARD_CONSTANTS.CURRENT_CVE;

	assets: Asset[] = [];
	riskSummary: RiskSummary = { critical: 0, high: 0, medium: 0, low: 0, total: 0 };
	vulnerabilities: Vulnerability[] = [];
	assetCards: AssetCard[] = [];

	currentPage: number = APP_CONSTANTS.PAGINATION.DEFAULT_CURRENT_PAGE;
	pageSize: number = APP_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE;
	paginatedAssets: Asset[] = [];

	sidebarCollapsed = false;
	isMobile = false;
	showVulnerabilityDrawer = false;
	selectedAsset: Asset | null = null;

	private subscriptions = new Subscription();

	constructor(
		private dashboardService: DashboardService,
		private layoutService: LayoutService,
	) {}

	ngOnInit(): void {
		this.isMobile = this.layoutService.getIsMobileValue();
		this.sidebarCollapsed = this.layoutService.getSidebarCollapsedValue();
		this.loadData();
		this.setupLayoutSubscriptions();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private loadData(): void {
		this.subscriptions.add(
			this.dashboardService.getAssets().subscribe((data: Asset[]) => {
				this.assets = data;
				this.updatePaginatedAssets();
			}),
		);

		this.subscriptions.add(
			this.dashboardService.getRiskSummary().subscribe((data) => {
				this.riskSummary = data;
			}),
		);

		this.subscriptions.add(
			this.dashboardService.getVulnerabilities().subscribe((data) => {
				this.vulnerabilities = data;
			}),
		);

		this.subscriptions.add(
			this.dashboardService.getAssetCards().subscribe((data) => {
				this.assetCards = data;
			}),
		);
	}

	private setupLayoutSubscriptions(): void {
		this.subscriptions.add(
			this.layoutService.getSidebarCollapsed().subscribe((collapsed) => {
				this.sidebarCollapsed = collapsed;
			}),
		);

		this.subscriptions.add(
			this.layoutService.isMobile().subscribe((isMobile) => {
				this.isMobile = isMobile;
			}),
		);
	}

	onSidebarItemClick(itemId: string): void {
		this.sidebarItems.forEach((item) => {
			item.active = item.id === itemId;
		});
	}

	onToggleSidebar(): void {
		this.layoutService.toggleSidebar();
	}

	openVulnerabilityDrawer(asset: Asset): void {
		this.selectedAsset = asset;
		this.showVulnerabilityDrawer = true;
	}

	closeVulnerabilityDrawer(): void {
		this.showVulnerabilityDrawer = false;
		this.selectedAsset = null;
	}

	updatePaginatedAssets(): void {
		const startIndex = (this.currentPage - 1) * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		this.paginatedAssets = this.assets.slice(startIndex, endIndex);
	}

	onPageChange(page: number): void {
		this.currentPage = page;
		this.updatePaginatedAssets();
	}
}
