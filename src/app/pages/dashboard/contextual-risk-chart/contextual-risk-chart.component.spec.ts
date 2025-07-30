import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextualRiskChartComponent } from './contextual-risk-chart.component';
import { IRiskSummary } from '../../../core/interfaces/asset.interface';

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
		expect(component.segments[0].colorClass).toBe('critical');
		expect(component.segments[1].colorClass).toBe('high');
		expect(component.segments[2].colorClass).toBe('medium');
		expect(component.segments[3].colorClass).toBe('low');
	});

	it('should return correct risk statistics', () => {
		const riskStats = component.riskStats;

		expect(riskStats.length).toBe(4);
		expect(riskStats[0]).toEqual({ level: 'Critical', count: 0, color: 'critical' });
		expect(riskStats[1]).toEqual({ level: 'High', count: 0, color: 'high' });
		expect(riskStats[2]).toEqual({ level: 'Medium', count: 0, color: 'medium' });
		expect(riskStats[3]).toEqual({ level: 'Low', count: 0, color: 'low' });
	});
});
