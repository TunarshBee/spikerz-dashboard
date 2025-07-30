import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetCardComponent, IAssetCardData } from './asset-card.component';

describe('AssetCardComponent', () => {
	let component: AssetCardComponent;
	let fixture: ComponentFixture<AssetCardComponent>;

	const mockAssetData: IAssetCardData = {
		name: 'Test Server',
		ipAddress: '192.168.1.1',
		icon: 'server',
		status: 'normal',
		metadata: [
			{
				label: 'Risk Level',
				value: 'Critical',
				highlight: 'yellow',
			},
		],
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AssetCardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AssetCardComponent);
		component = fixture.componentInstance;
		component.assetData = mockAssetData;
		fixture.detectChanges();
	});

	it('should create and display asset information', () => {
		expect(component).toBeTruthy();
		expect(component.assetData).toEqual(mockAssetData);
	});

	it('should display asset name and IP address', () => {
		const compiled = fixture.nativeElement;
		expect(compiled.textContent).toContain('Test Server');
		expect(compiled.textContent).toContain('192.168.1.1');
	});

	it('should display metadata with correct highlighting', () => {
		expect(component.assetData.metadata.length).toBe(1);
		expect(component.assetData.metadata[0].highlight).toBe('yellow');
	});
});
