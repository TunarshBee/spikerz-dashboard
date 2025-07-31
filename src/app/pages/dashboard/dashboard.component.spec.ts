import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../core/services/dashboard.service';
import { LayoutService } from '../../core/services/layout.service';
import { Asset, RiskSummary, CVE } from '../../core/types';
import { RISK_LEVELS, ASSET_STATUS } from '../../core/constants/risk.constants';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;
	let mockDashboardService: jasmine.SpyObj<DashboardService>;
	let mockLayoutService: jasmine.SpyObj<LayoutService>;

	const mockCVE: CVE = {
		id: 'CVE-2024-1234',
		description: 'Test vulnerability description',
		extra: 'Additional details',
	};

	const mockAssets: Asset[] = [
		{
			id: '1',
			name: 'Test Server',
			ipAddress: '192.168.1.1',
			riskLevel: RISK_LEVELS.CRITICAL,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
	];

	const mockRiskSummary: RiskSummary = {
		critical: 2,
		high: 3,
		medium: 1,
		low: 0,
		total: 6,
	};

	beforeEach(async () => {
		mockDashboardService = jasmine.createSpyObj('DashboardService', [
			'getCurrentCVE',
			'getAssets',
			'getRiskSummary',
			'getVulnerabilities',
			'getAssetCards',
		]);

		mockLayoutService = jasmine.createSpyObj('LayoutService', [
			'getIsMobileValue',
			'getSidebarCollapsedValue',
			'getSidebarCollapsed',
			'isMobile',
			'toggleSidebar',
		]);

		mockDashboardService.getCurrentCVE.and.returnValue(mockCVE);
		mockDashboardService.getAssets.and.returnValue(of(mockAssets));
		mockDashboardService.getRiskSummary.and.returnValue(of(mockRiskSummary));
		mockDashboardService.getVulnerabilities.and.returnValue(of([]));
		mockDashboardService.getAssetCards.and.returnValue(of([]));

		mockLayoutService.getIsMobileValue.and.returnValue(false);
		mockLayoutService.getSidebarCollapsedValue.and.returnValue(false);
		mockLayoutService.getSidebarCollapsed.and.returnValue(of(false));
		mockLayoutService.isMobile.and.returnValue(of(false));

		await TestBed.configureTestingModule({
			imports: [DashboardComponent, HttpClientTestingModule],
			providers: [
				{ provide: DashboardService, useValue: mockDashboardService },
				{ provide: LayoutService, useValue: mockLayoutService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should handle sidebar item click correctly', () => {
		const initialActiveItem = component.sidebarItems.find((item) => item.active);
		const targetItemId = 'dashboard';

		component.onSidebarItemClick(targetItemId);

		const updatedActiveItem = component.sidebarItems.find((item) => item.active);
		expect(updatedActiveItem?.id).toBe(targetItemId);
		expect(updatedActiveItem?.id).not.toBe(initialActiveItem?.id);
	});

	it('should toggle vulnerability drawer state', () => {
		const mockAsset: Asset = {
			id: '1',
			name: 'Test Asset',
			ipAddress: '192.168.1.1',
			riskLevel: RISK_LEVELS.HIGH,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		};

		expect(component.showVulnerabilityDrawer).toBeFalse();
		expect(component.selectedAsset).toBeNull();

		component.openVulnerabilityDrawer(mockAsset);

		expect(component.showVulnerabilityDrawer).toBeTrue();
		expect(component.selectedAsset).toEqual(mockAsset);

		component.closeVulnerabilityDrawer();

		expect(component.showVulnerabilityDrawer).toBeFalse();
		expect(component.selectedAsset).toBeNull();
	});
});
