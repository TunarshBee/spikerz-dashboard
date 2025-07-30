import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input() title?: string;
	@Input() variant: 'default' | 'outlined' = 'default';
	@Input() padding: 'sm' | 'md' | 'lg' = 'md';
}
