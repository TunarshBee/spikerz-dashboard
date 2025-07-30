import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface IEndNodeCardData {
  name: string;
  ipAddress: string;
  icon: string;
  status: 'error' | 'normal';
  metadata: Array<{
    label?: string;
    value: string;
    highlight?: 'yellow' | 'blue' | 'purple' | 'green';
  }>;
}

@Component({
  selector: 'app-end-node-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end-node-card.component.html',
  styleUrls: ['./end-node-card.component.scss']
})
export class EndNodeCardComponent {
  @Input() cardData: IEndNodeCardData = {
    name: '',
    ipAddress: '',
    icon: '',
    status: 'normal',
    metadata: []
  };
} 