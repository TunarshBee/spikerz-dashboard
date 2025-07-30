import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IRemediationTechnique } from '../../core/interfaces/asset.interface';
import { DashboardService } from '../../core/services/dashboard.service';
import { IconUtils } from '../../core/utils/icon.utils';
import { ServerImageComponent } from '../../shared/components/ui/server-image/server-image.component';


@Component({
	selector: 'app-remediation-techniques',
	standalone: true,
	imports: [CommonModule, ServerImageComponent],
	templateUrl: './remediation-techniques.component.html',
	styleUrls: ['./remediation-techniques.component.scss']
})
export class RemediationTechniquesComponent implements OnInit, OnDestroy {
	techniques: IRemediationTechnique[] = [];
	expandedTechniques: Set<string> = new Set();
	private subscriptions = new Subscription();

	constructor(private dashboardService: DashboardService) {}

	ngOnInit(): void {
		this.loadRemediationTechniques();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private loadRemediationTechniques(): void {
		this.subscriptions.add(
			this.dashboardService.getRemediationTechniques().subscribe(data => {
				this.techniques = data;
			})
		);
	}

	getIconClass(icon: string): string {
		return IconUtils.getIconClass(icon);
	}

	toggleTechnique(techniqueId: string): void {
		if (this.expandedTechniques.has(techniqueId)) {
			this.expandedTechniques.delete(techniqueId);
		} else {
			this.expandedTechniques.add(techniqueId);
		}
	}

	isExpanded(techniqueId: string): boolean {
		return this.expandedTechniques.has(techniqueId);
	}
} 