import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface IAssetCardData {
  name: string;
  ipAddress: string;
  icon: string;
  status: 'error' | 'normal';
  metadata: Array<{
    label: string;
    value: string;
    highlight: 'yellow' | 'blue' | 'purple' | 'green';
  }>;
}

@Component({
  selector: 'app-asset-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss']
})
export class AssetCardComponent {
  @Input() assetData: IAssetCardData = {
    name: '',
    ipAddress: '',
    icon: '',
    status: 'normal',
    metadata: []
  };
} 