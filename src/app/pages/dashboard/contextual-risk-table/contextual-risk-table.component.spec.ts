import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextualRiskTableComponent } from './contextual-risk-table.component';
import { IAsset } from '../../../core/interfaces/asset.interface';

describe('ContextualRiskTableComponent', () => {
	let component: ContextualRiskTableComponent;
	let fixture: ComponentFixture<ContextualRiskTableComponent>;

	const mockAssets: IAsset[] = [
		{
			id: '1',
			name: 'Test Server 1',
			ipAddress: '192.168.1.1',
			riskLevel: 'Critical',
			status: 'active',
			icon: 'server',
		},
		{
			id: '2',
			name: 'Test Server 2',
			ipAddress: '192.168.1.2',
			riskLevel: 'High',
			status: 'active',
			icon: 'server',
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ContextualRiskTableComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ContextualRiskTableComponent);
		component = fixture.componentInstance;
		component.assets = mockAssets;
		fixture.detectChanges();
	});

	it('should create and display assets', () => {
		expect(component).toBeTruthy();
		expect(component.assets).toEqual(mockAssets);
	});

	it('should paginate assets correctly', () => {
		component.pageSize = 1;
		component.currentPage = 1;
		fixture.detectChanges();

		const paginatedAssets = component.paginatedAssets;
		expect(paginatedAssets.length).toBe(1);
		expect(paginatedAssets[0].id).toBe('1');
	});

	it('should emit page change event', () => {
		spyOn(component.pageChange, 'emit');

		component.onPageChange(2);

		expect(component.pageChange.emit).toHaveBeenCalledWith(2);
	});
});
