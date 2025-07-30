import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AssetFlowComponent } from './asset-flow.component';
import { DashboardService } from '../../../core/services/dashboard.service';
import { AssetFlowNode } from '../../../core/types';
import { NODE_TYPES, RISK_LEVELS } from '../../../core/constants/risk.constants';

describe('AssetFlowComponent', () => {
	let component: AssetFlowComponent;
	let fixture: ComponentFixture<AssetFlowComponent>;
	let mockDashboardService: jasmine.SpyObj<DashboardService>;

	const mockAssetFlow: AssetFlowNode[] = [
		{
			id: '1',
			name: 'Entry Node',
			ipAddress: '192.168.1.1',
			icon: 'server',
			type: NODE_TYPES.ENTRY,
			connections: ['2'],
		},
	];

	beforeEach(async () => {
		mockDashboardService = jasmine.createSpyObj('DashboardService', [
			'getAssetFlow',
			'getVulnerabilities',
			'getAssetCards',
		]);

		mockDashboardService.getAssetFlow.and.returnValue(of(mockAssetFlow));
		mockDashboardService.getVulnerabilities.and.returnValue(of([]));
		mockDashboardService.getAssetCards.and.returnValue(of([]));

		await TestBed.configureTestingModule({
			imports: [AssetFlowComponent],
			providers: [{ provide: DashboardService, useValue: mockDashboardService }],
		}).compileComponents();

		fixture = TestBed.createComponent(AssetFlowComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create and load asset flow data', () => {
		expect(component).toBeTruthy();
		expect(mockDashboardService.getAssetFlow).toHaveBeenCalled();
		expect(component.assetFlow()).toEqual(mockAssetFlow);
	});

	it('should handle hover states correctly', () => {
		expect(component.showEntryHover).toBeFalse();
		expect(component.hoveredMiddleNode).toBeNull();
		expect(component.hoveredEndNode).toBeNull();
	});

	it('should have risk legend data', () => {
		expect(component.riskLegend.length).toBe(3);
		expect(component.riskLegend[0].status).toBe(RISK_LEVELS.CRITICAL);
		expect(component.riskLegend[1].status).toBe(RISK_LEVELS.HIGH);
		expect(component.riskLegend[2].status).toBe(RISK_LEVELS.LOW);
	});
});
