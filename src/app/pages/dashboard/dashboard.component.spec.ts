import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../core/services/dashboard.service';
import { LayoutService } from '../../core/services/layout.service';
import { Asset, CVE } from '../../core/types';
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

	beforeEach(async () => {
		mockDashboardService = jasmine.createSpyObj('DashboardService', ['getAssets']);

		mockLayoutService = jasmine.createSpyObj('LayoutService', [
			'getIsMobileValue',
			'getSidebarCollapsedValue',
			'getSidebarCollapsed',
			'isMobile',
			'toggleSidebar',
		]);

		mockDashboardService.getAssets.and.returnValue(of(mockAssets));

		mockLayoutService.getIsMobileValue.and.returnValue(false);
		mockLayoutService.getSidebarCollapsedValue.and.returnValue(false);
		mockLayoutService.getSidebarCollapsed.and.returnValue(of(false));
		mockLayoutService.isMobile.and.returnValue(of(false));

		await TestBed.configureTestingModule({
			imports: [DashboardComponent],
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
});
