import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetCardComponent } from './asset-card.component';
import { AssetCardData } from '../../../../core/types';
import { ASSET_CARD_STATUS, HIGHLIGHT_COLORS } from '../../../../core/constants/risk.constants';

describe('AssetCardComponent', () => {
	let component: AssetCardComponent;
	let fixture: ComponentFixture<AssetCardComponent>;

	const mockAssetData: AssetCardData = {
		name: 'Test Asset',
		ipAddress: '192.168.1.1',
		icon: 'server',
		status: ASSET_CARD_STATUS.NORMAL,
		metadata: [
			{
				label: 'Risk Level',
				value: 'Critical',
				highlight: HIGHLIGHT_COLORS.YELLOW,
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

	it('should create and display asset data', () => {
		expect(component).toBeTruthy();
		expect(component.assetData).toEqual(mockAssetData);
	});

	it('should display asset name and IP address', () => {
		const compiled = fixture.nativeElement;
		expect(compiled.textContent).toContain('Test Asset');
		expect(compiled.textContent).toContain('192.168.1.1');
	});

	it('should display metadata with correct highlighting', () => {
		expect(component.assetData.metadata.length).toBe(1);
		expect(component.assetData.metadata[0].highlight).toBe(HIGHLIGHT_COLORS.YELLOW);
	});
});
