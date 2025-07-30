import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
	selector: 'app-remediation',
	imports: [CommonModule],
	templateUrl: './remediation.component.html',
	styleUrl: './remediation.component.scss',
})
export class RemediationComponent {
	showRemediation = signal(false);
	remediation = input.required<string>();
	heading = input.required<string>();
	title = input.required<string>();

	toggleRemediation() {
		this.showRemediation.set(!this.showRemediation());
	}
}
