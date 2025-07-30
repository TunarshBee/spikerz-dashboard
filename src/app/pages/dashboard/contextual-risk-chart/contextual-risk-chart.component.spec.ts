import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextualRiskChartComponent } from './contextual-risk-chart.component';
import { RISK_LEVELS, RISK_COLORS } from '../../../core/constants/risk.constants';

describe('ContextualRiskChartComponent', () => {
	let component: ContextualRiskChartComponent;
	let fixture: ComponentFixture<ContextualRiskChartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ContextualRiskChartComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ContextualRiskChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create and initialize with default risk summary data', () => {
		expect(component).toBeTruthy();
		expect(component.riskSummary()).toEqual({
			critical: 0,
			high: 0,
			medium: 0,
			low: 0,
			total: 0,
		});
	});

	it('should calculate segments correctly based on risk data', () => {
		component.ngOnInit();

		expect(component.segments.length).toBe(4);
		expect(component.segments[0].colorClass).toBe(RISK_COLORS.CRITICAL);
		expect(component.segments[1].colorClass).toBe(RISK_COLORS.HIGH);
		expect(component.segments[2].colorClass).toBe(RISK_COLORS.MEDIUM);
		expect(component.segments[3].colorClass).toBe(RISK_COLORS.LOW);
	});

	it('should return correct risk statistics', () => {
		const riskStats = component.riskStats;

		expect(riskStats.length).toBe(4);
		expect(riskStats[0]).toEqual({
			level: RISK_LEVELS.CRITICAL,
			count: 0,
			color: RISK_COLORS.CRITICAL,
		});
		expect(riskStats[1]).toEqual({ level: RISK_LEVELS.HIGH, count: 0, color: RISK_COLORS.HIGH });
		expect(riskStats[2]).toEqual({
			level: RISK_LEVELS.MEDIUM,
			count: 0,
			color: RISK_COLORS.MEDIUM,
		});
		expect(riskStats[3]).toEqual({ level: RISK_LEVELS.LOW, count: 0, color: RISK_COLORS.LOW });
	});
});
