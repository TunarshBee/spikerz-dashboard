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
import {
	RISK_LEVELS,
	ASSET_STATUS,
	NODE_TYPES,
	ASSET_CARD_STATUS,
	HIGHLIGHT_COLORS,
} from '../constants/risk.constants';

@Injectable({
	providedIn: 'root',
})
export class DashboardService {
	private currentCVE: CVE = {
		id: 'CVE-2024-6387',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		extra:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	};

	private assetFlowData: AssetFlowNode[] = [
		{
			id: '1',
			name: 'Loremipsumm',
			ipAddress: '',
			icon: 'server',
			type: NODE_TYPES.ENTRY,
			connections: ['2'],
		},
		{
			id: '2',
			name: 'Loremipsu',
			ipAddress: '',
			icon: 'server',
			type: NODE_TYPES.MIDDLE,
			connections: ['3'],
		},
		{
			id: '3',
			name: 'Loremipsu',
			ipAddress: '',
			icon: 'server',
			type: NODE_TYPES.MIDDLE,
			connections: ['4', '5'],
		},
		{
			id: '4',
			name: 'Loremipsumdolorsit',
			ipAddress: '192.168.1.1',
			icon: 'server',
			type: NODE_TYPES.END,
			riskLevel: RISK_LEVELS.CRITICAL,
		},
		{
			id: '5',
			name: 'Loremipsumdolorsit002',
			ipAddress: '192.168.1.2',
			icon: 'server',
			type: NODE_TYPES.END,
			riskLevel: RISK_LEVELS.CRITICAL,
		},
	];

	private assetsData: Asset[] = [
		{
			id: '1',
			name: 'Loremipsumdolorsit',
			ipAddress: '192.168.1.1',
			riskLevel: RISK_LEVELS.CRITICAL,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '2',
			name: 'Loremipsumdolorsit002',
			ipAddress: '192.168.1.2',
			riskLevel: RISK_LEVELS.CRITICAL,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '3',
			name: 'WebServer-Prod-01',
			ipAddress: '192.168.1.3',
			riskLevel: RISK_LEVELS.HIGH,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '4',
			name: 'Database-Main',
			ipAddress: '192.168.1.4',
			riskLevel: RISK_LEVELS.HIGH,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '5',
			name: 'LoadBalancer-01',
			ipAddress: '192.168.1.5',
			riskLevel: RISK_LEVELS.MEDIUM,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '6',
			name: 'Application-Server-01',
			ipAddress: '192.168.1.6',
			riskLevel: RISK_LEVELS.MEDIUM,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '7',
			name: 'FileServer-Backup',
			ipAddress: '192.168.1.7',
			riskLevel: RISK_LEVELS.LOW,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '8',
			name: 'Monitoring-Node',
			ipAddress: '192.168.1.8',
			riskLevel: RISK_LEVELS.LOW,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '9',
			name: 'API-Gateway',
			ipAddress: '192.168.1.9',
			riskLevel: RISK_LEVELS.CRITICAL,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '10',
			name: 'Cache-Server-Redis',
			ipAddress: '192.168.1.10',
			riskLevel: RISK_LEVELS.HIGH,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '11',
			name: 'Mail-Server',
			ipAddress: '192.168.1.11',
			riskLevel: RISK_LEVELS.MEDIUM,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
		{
			id: '12',
			name: 'DNS-Server-Primary',
			ipAddress: '192.168.1.12',
			riskLevel: RISK_LEVELS.CRITICAL,
			status: ASSET_STATUS.ACTIVE,
			icon: 'server',
		},
	];

	private riskSummaryData: RiskSummary = {
		critical: 2,
		high: 5,
		medium: 0,
		low: 17,
		total: 0,
	};

	private remediationTechniquesData: RemediationTechnique[] = [
		{
			id: 'A',
			name: 'Remediation Technique A',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae tortor convallis vitae arcu. Magna.',
			assets: [
				{
					id: '1',
					name: 'Lorem P',
					ipAddress: '192.168.1.1',
					riskLevel: RISK_LEVELS.CRITICAL,
					status: ASSET_STATUS.ACTIVE,
					icon: 'server',
				},
				{
					id: '2',
					name: 'Lorem P',
					ipAddress: '192.168.1.2',
					riskLevel: RISK_LEVELS.CRITICAL,
					status: ASSET_STATUS.ACTIVE,
					icon: 'server',
				},
			],
		},
		{
			id: 'B',
			name: 'Remediation Technique B',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis viverra etiam pellentesque lectus semper in massa purus. Auctor aenean aenean senectus massa dignissim vehicula mi erat purus. Praesent scelerisque aliquet metus sagittis dictum sed sed. Sed venenatis sed urna quam.',
			assets: [
				{
					id: '3',
					name: 'Lorem S',
					ipAddress: '192.168.1.3',
					riskLevel: RISK_LEVELS.HIGH,
					status: ASSET_STATUS.ACTIVE,
					icon: 'server',
				},
				{
					id: '4',
					name: 'Lorem S',
					ipAddress: '192.168.1.4',
					riskLevel: RISK_LEVELS.HIGH,
					status: ASSET_STATUS.ACTIVE,
					icon: 'server',
				},
			],
		},
		{
			id: 'C',
			name: 'Remediation Technique C',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet elementum luctus odio. Id enim urna.',
			assets: [
				{
					id: '5',
					name: 'Lorem T',
					ipAddress: '192.168.1.5',
					riskLevel: RISK_LEVELS.MEDIUM,
					status: ASSET_STATUS.ACTIVE,
					icon: 'server',
				},
				{
					id: '6',
					name: 'Lorem T',
					ipAddress: '192.168.1.6',
					riskLevel: RISK_LEVELS.MEDIUM,
					status: ASSET_STATUS.ACTIVE,
					icon: 'server',
				},
			],
		},
	];

	private vulnerabilitiesData: Vulnerability[] = [
		{
			id: '1',
			title: 'Lorem Ipsum Dolor Sit',
			description: 'Critical vulnerability affecting multiple assets',
			affectedAssets: ['1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4'],
			severity: RISK_LEVELS.CRITICAL,
			date: '2024-01-15',
		},
	];

	private assetCardsData: AssetCard[] = [
		{
			id: '1261165940',
			name: 'Loremipsumdolorsit',
			ipAddress: '192.168.1.1',
			icon: 'server',
			status: ASSET_CARD_STATUS.ERROR,
			metadata: [
				{ label: 'Lorem', value: 'Lorem "Ipsum"', highlight: HIGHLIGHT_COLORS.YELLOW },
				{ label: 'Loremipsum', value: 'Lorem 1234,5678', highlight: HIGHLIGHT_COLORS.BLUE },
			],
		},
		{
			id: '1261165941',
			name: 'Loremipsu',
			ipAddress: '',
			icon: 'server',
			status: ASSET_CARD_STATUS.NORMAL,
			metadata: [
				{
					label: 'Lorem',
					value: 'Loremipsum Loremipsum 1.2.3.4',
					highlight: HIGHLIGHT_COLORS.PURPLE,
				},
				{
					label: '',
					value: '1.2.3.4 Loremipsum 1.2.3.4 1.2.3.4',
					highlight: HIGHLIGHT_COLORS.PURPLE,
				},
			],
		},
		{
			id: '1261165939',
			name: 'Loremipsumdolorsit002',
			ipAddress: '192.168.1.2',
			icon: 'server',
			status: ASSET_CARD_STATUS.ERROR,
			metadata: [
				{ label: 'Lorem', value: 'Lorem "Ipsum"', highlight: HIGHLIGHT_COLORS.YELLOW },
				{ label: 'Loremipsum', value: 'Lorem 1234,5678', highlight: HIGHLIGHT_COLORS.BLUE },
			],
		},
		{
			id: '1261165942',
			name: 'Loremipsum',
			ipAddress: '',
			icon: 'server',
			status: ASSET_CARD_STATUS.NORMAL,
			metadata: [
				{
					label: 'Lorem',
					value: 'Lorem "Ipsum" Lorem Loremipsum Loremipsum',
					highlight: HIGHLIGHT_COLORS.YELLOW,
				},
				{
					label: '',
					value: '1.2.3.4 Loremipsum 1.2.3.4 1.2.3.4 Lorem 1234,5678',
					highlight: HIGHLIGHT_COLORS.PURPLE,
				},
				{
					label: 'Lorem',
					value: 'Lorem "Ipsum" Loremipsum Loremipsum',
					highlight: HIGHLIGHT_COLORS.YELLOW,
				},
				{
					label: '',
					value: '1.2.3.4 1.2.3.4 Loremipsum Loremipsum 1.2.3.4 1.2.3.4',
					highlight: HIGHLIGHT_COLORS.PURPLE,
				},
			],
		},
	];

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
