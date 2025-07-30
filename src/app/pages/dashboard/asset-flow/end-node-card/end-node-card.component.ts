import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndNodeCardData } from '../../../../core/types';
import { ASSET_CARD_STATUS } from '../../../../core/constants/risk.constants';

@Component({
	selector: 'app-end-node-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './end-node-card.component.html',
	styleUrls: ['./end-node-card.component.scss'],
})
export class EndNodeCardComponent {
	@Input() cardData: EndNodeCardData = {
		name: '',
		ipAddress: '',
		icon: '',
		status: ASSET_CARD_STATUS.NORMAL,
		metadata: [],
	};
}
