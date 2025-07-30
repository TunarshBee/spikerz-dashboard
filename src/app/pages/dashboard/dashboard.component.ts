import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import {
	SidebarComponent,
	ISidebarItem,
	IUserProfile,
} from '../../shared/components/sidebar/sidebar.component';
import { CardComponent } from '../../shared/components/ui/card/card.component';

import {
	IAsset,
	IVulnerability,
	IRiskSummary,
	IAssetCard,
	ICVE,
} from '../../core/interfaces/asset.interface';
import { DashboardService } from '../../core/services/dashboard.service';
import { LayoutService } from '../../core/services/layout.service';
import { RemediationComponent } from '../../shared/components/ui/remediation/remediation.component';
import { AssetFlowComponent } from './asset-flow/asset-flow.component';
import { ContextualRiskTableComponent } from './contextual-risk-table/contextual-risk-table.component';
import { ContextualRiskChartComponent } from './contextual-risk-chart/contextual-risk-chart.component';
import { IconUtils } from '../../core/utils/icon.utils';

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
	sidebarItems: ISidebarItem[] = [
		{ id: 'dashboard', icon: 'dashboard', label: 'Lorem', active: false },
		{ id: 'vulnerabilities', icon: 'vulnerabilities', label: 'Lorem', active: true },
		{ id: 'assets', icon: 'assets', label: 'Lorem', active: false },
		{ id: 'reports', icon: 'reports', label: 'Lorem', active: false },
		{ id: 'plug', icon: 'plug', label: 'Lorem', active: false },
		{ id: 'docs', icon: 'documentation', label: 'Lorem', active: false },
		{ id: 'filters', icon: 'filters', label: 'Lorem', active: false },
	];

	remediations = {
		A: 'Lorem ipsum dolor sit amet consectetur. In laoreet elementum luctus odio. Id enim urna.',
		B: 'Lorem ipsum dolor sit amet consectetur. Quis viverra etiam pellentesque lectus semper in massa purus. Auctor aenean aenean senectus massa dignissim vehicula mi erat purus. Praesent scelerisque aliquet metus sagittis dictum sed sed. Sed venenatis sed urna quam.',
		C: 'Lorem ipsum dolor sit amet consectetur. Nunc vitae tortor convallis vitae arcu. Magna.',
	};

	getRemediationEntries(): Array<{ key: string; value: string }> {
		return Object.entries(this.remediations).map(([key, value]) => ({
			key,
			value,
		}));
	}

	userProfile: IUserProfile = {
		name: 'John Doe',
		email: 'john.doe@company.com',
		avatar: '👤',
	};

	// Dashboard data
	currentCVE!: ICVE;

	assets: IAsset[] = [];
	riskSummary: IRiskSummary = { critical: 0, high: 0, medium: 0, low: 0, total: 0 };
	vulnerabilities: IVulnerability[] = [];
	assetCards: IAssetCard[] = [];

	// Pagination state
	currentPage = 1;
	pageSize = 2;
	paginatedAssets: IAsset[] = [];

	// UI state
	sidebarCollapsed = false;
	isMobile = false;
	showVulnerabilityDrawer = false;
	selectedAsset: IAsset | null = null;

	// Subscriptions
	private subscriptions = new Subscription();

	constructor(
		private dashboardService: DashboardService,
		private layoutService: LayoutService,
	) {
		// Initialize mobile state immediately
	}

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
		// Load current CVE
		this.currentCVE = this.dashboardService.getCurrentCVE();

		// Load assets
		this.subscriptions.add(
			this.dashboardService.getAssets().subscribe((data) => {
				this.assets = data;
				this.updatePaginatedAssets();
			}),
		);

		// Load risk summary
		this.subscriptions.add(
			this.dashboardService.getRiskSummary().subscribe((data) => {
				this.riskSummary = data;
			}),
		);

		// Load vulnerabilities
		this.subscriptions.add(
			this.dashboardService.getVulnerabilities().subscribe((data) => {
				this.vulnerabilities = data;
			}),
		);

		// Load asset cards
		this.subscriptions.add(
			this.dashboardService.getAssetCards().subscribe((data) => {
				this.assetCards = data;
			}),
		);
	}

	private setupLayoutSubscriptions(): void {
		// Subscribe to sidebar state
		this.subscriptions.add(
			this.layoutService.getSidebarCollapsed().subscribe((collapsed) => {
				this.sidebarCollapsed = collapsed;
			}),
		);

		// Subscribe to mobile state
		this.subscriptions.add(
			this.layoutService.isMobile().subscribe((isMobile) => {
				this.isMobile = isMobile;
			}),
		);
	}

	// Event handlers
	onSidebarItemClick(itemId: string): void {
		this.sidebarItems.forEach((item) => {
			item.active = item.id === itemId;
		});
	}

	onToggleSidebar(): void {
		this.layoutService.toggleSidebar();
	}

	openVulnerabilityDrawer(asset: IAsset): void {
		this.selectedAsset = asset;
		this.showVulnerabilityDrawer = true;
	}

	closeVulnerabilityDrawer(): void {
		this.showVulnerabilityDrawer = false;
		this.selectedAsset = null;
	}

	// Pagination methods
	updatePaginatedAssets(): void {
		const startIndex = (this.currentPage - 1) * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		this.paginatedAssets = this.assets.slice(startIndex, endIndex);
	}

	onPageChange(page: number): void {
		this.currentPage = page;
		this.updatePaginatedAssets();
	}

	getTotalPages(): number {
		return Math.ceil(this.assets.length / this.pageSize);
	}

	getPageInfo(): string {
		const start = (this.currentPage - 1) * this.pageSize + 1;
		const end = Math.min(this.currentPage * this.pageSize, this.assets.length);
		return `Showing ${start}-${end} of ${this.assets.length}`;
	}

	getIconClass(icon: string): string {
		return IconUtils.getIconClass(icon);
	}

	getRiskLevelColor(level: string): string {
		return IconUtils.getRiskLevelColor(level);
	}
}
