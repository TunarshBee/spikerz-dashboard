import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	Asset,
	Vulnerability,
	RemediationTechnique,
	AssetFlowNode,
	RiskSummary,
	AssetCard,
	CVE,
} from '../types';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

@Injectable({
	providedIn: 'root',
})
export class DashboardService {
	private currentCVE: CVE = DASHBOARD_CONSTANTS.CURRENT_CVE;
	private assetFlowData: AssetFlowNode[] = DASHBOARD_CONSTANTS.ASSET_FLOW_DATA;
	private assetsData: Asset[] = DASHBOARD_CONSTANTS.ASSETS_DATA;
	private riskSummaryData: RiskSummary = DASHBOARD_CONSTANTS.RISK_SUMMARY_DATA;
	private remediationTechniquesData: RemediationTechnique[] =
		DASHBOARD_CONSTANTS.REMEDIATION_TECHNIQUES_DATA;
	private vulnerabilitiesData: Vulnerability[] = DASHBOARD_CONSTANTS.VULNERABILITIES_DATA;
	private assetCardsData: AssetCard[] = DASHBOARD_CONSTANTS.ASSET_CARDS_DATA;

	constructor() {}

	getCurrentCVE(): CVE {
		return this.currentCVE;
	}

	getAssetFlow(): Observable<AssetFlowNode[]> {
		return new Observable((observer) => {
			observer.next(this.assetFlowData);
			observer.complete();
		});
	}

	getAssets(): Observable<Asset[]> {
		return new Observable((observer) => {
			observer.next(this.assetsData);
			observer.complete();
		});
	}

	getRiskSummary(): Observable<RiskSummary> {
		return new Observable((observer) => {
			observer.next(this.riskSummaryData);
			observer.complete();
		});
	}

	getRemediationTechniques(): Observable<RemediationTechnique[]> {
		return new Observable((observer) => {
			observer.next(this.remediationTechniquesData);
			observer.complete();
		});
	}

	getVulnerabilities(): Observable<Vulnerability[]> {
		return new Observable((observer) => {
			observer.next(this.vulnerabilitiesData);
			observer.complete();
		});
	}

	getAssetCards(): Observable<AssetCard[]> {
		return new Observable((observer) => {
			observer.next(this.assetCardsData);
			observer.complete();
		});
	}
}
