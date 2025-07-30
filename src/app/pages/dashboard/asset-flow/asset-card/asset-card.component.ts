import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetCardData } from '../../../../core/types';
import { ASSET_CARD_STATUS } from '../../../../core/constants/risk.constants';

@Component({
	selector: 'app-asset-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './asset-card.component.html',
	styleUrls: ['./asset-card.component.scss'],
})
export class AssetCardComponent {
	@Input() assetData: AssetCardData = {
		name: '',
		ipAddress: '',
		icon: '',
		status: ASSET_CARD_STATUS.NORMAL,
		metadata: [],
	};
}
