import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-server-image',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './server-image.component.html',
	styleUrls: ['./server-image.component.scss'],
})
export class ServerImageComponent {
	@Input() size: 'sm' | 'md' | 'lg' = 'md';
	@Input() variant: 'default' | 'outlined' = 'default';
	@Input() alt: string = 'Server icon';
}
