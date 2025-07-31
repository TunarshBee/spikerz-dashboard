import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextualRiskChartComponent } from './contextual-risk-chart.component';
import { RISK_LEVELS, RISK_COLORS } from '../../../core/constants/risk.constants';
import { Asset } from '../../../core/types';

describe('ContextualRiskChartComponent', () => {
	let component: ContextualRiskChartComponent;
	let fixture: ComponentFixture<ContextualRiskChartComponent>;

	const mockAssets: Asset[] = [
		{
			id: '1',
			name: 'Server 1',
			ipAddress: '192.168.1.1',
			icon: 'server',
			riskLevel: 'Critical',
			status: 'active',
		},
		{
			id: '2',
			name: 'Server 2',
			ipAddress: '192.168.1.2',
			icon: 'server',
			riskLevel: 'High',
			status: 'active',
		},
		{
			id: '3',
			name: 'Server 3',
			ipAddress: '192.168.1.3',
			icon: 'server',
			riskLevel: 'Medium',
			status: 'active',
		},
		{
			id: '4',
			name: 'Server 4',
			ipAddress: '192.168.1.4',
			icon: 'server',
			riskLevel: 'Low',
			status: 'active',
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ContextualRiskChartComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ContextualRiskChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create and initialize with default assets data', () => {
		expect(component).toBeTruthy();
		expect(component.assets()).toEqual([]);
	});

	it('should calculate segments correctly based on assets data', () => {
		const testFixture = TestBed.createComponent(ContextualRiskChartComponent);
		const testComponent = testFixture.componentInstance;

		(testComponent as any).assets = () => mockAssets;

		testComponent.ngOnInit();

		expect(testComponent.segments.length).toBe(4);
		expect(testComponent.segments[0].colorClass).toBe(RISK_COLORS.CRITICAL);
		expect(testComponent.segments[1].colorClass).toBe(RISK_COLORS.HIGH);
		expect(testComponent.segments[2].colorClass).toBe(RISK_COLORS.MEDIUM);
		expect(testComponent.segments[3].colorClass).toBe(RISK_COLORS.LOW);
		expect(testComponent.total).toBe(4);
	});

	it('should return correct risk statistics from assets data', () => {
		const testFixture = TestBed.createComponent(ContextualRiskChartComponent);
		const testComponent = testFixture.componentInstance;

		(testComponent as any).assets = () => mockAssets;

		const riskStats = testComponent.riskStats;

		expect(riskStats.length).toBe(4);
		expect(riskStats[0]).toEqual({
			level: RISK_LEVELS.CRITICAL,
			count: 1,
			color: RISK_COLORS.CRITICAL,
		});
		expect(riskStats[1]).toEqual({ level: RISK_LEVELS.HIGH, count: 1, color: RISK_COLORS.HIGH });
		expect(riskStats[2]).toEqual({
			level: RISK_LEVELS.MEDIUM,
			count: 1,
			color: RISK_COLORS.MEDIUM,
		});
		expect(riskStats[3]).toEqual({ level: RISK_LEVELS.LOW, count: 1, color: RISK_COLORS.LOW });
	});

	it('should handle empty assets array', () => {
		const testFixture = TestBed.createComponent(ContextualRiskChartComponent);
		const testComponent = testFixture.componentInstance;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(testComponent as any).assets = () => [];

		testComponent.ngOnInit();

		expect(testComponent.total).toBe(0);
		expect(testComponent.segments.length).toBe(4);
		expect(testComponent.segments.every((segment) => segment.percent === 0)).toBe(true);
	});
});
