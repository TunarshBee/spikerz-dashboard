import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
	IAsset, 
	IVulnerability, 
	IRemediationTechnique, 
	IAssetFlowNode, 
	IRiskSummary, 
	IAssetCard 
} from '../interfaces/asset.interface';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {
	private currentCVE = {
		id: 'CVE-2024-6387',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		extra: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
	};

	private assetFlowData: IAssetFlowNode[] = [
		{
			id: '1',
			name: 'Loremipsumm',
			ipAddress: '',
			icon: 'server',
			type: 'entry',
			connections: ['2']
		},
		{
			id: '2',
			name: 'Loremipsu',
			ipAddress: '',
			icon: 'server',
			type: 'middle',
			connections: ['3']
		},
		{
			id: '3',
			name: 'Loremipsu',
			ipAddress: '',
			icon: 'server',
			type: 'middle',
			connections: ['4', '5']
		},
		{
			id: '4',
			name: 'Loremipsumdolorsit',
			ipAddress: '192.168.1.1',
			icon: 'server',
			type: 'end',
			riskLevel: 'Critical'
		},
		{
			id: '5',
			name: 'Loremipsumdolorsit002',
			ipAddress: '192.168.1.2',
			icon: 'server',
			type: 'end',
			riskLevel: 'Critical'
		}
	];

	private assetsData: IAsset[] = [
		{
			id: '1',
			name: 'Loremipsumdolorsit',
			ipAddress: '192.168.1.1',
			riskLevel: 'Critical',
			status: 'active',
			icon: 'server'
		},
		{
			id: '2',
			name: 'Loremipsumdolorsit002',
			ipAddress: '192.168.1.2',
			riskLevel: 'Critical',
			status: 'active',
			icon: 'server'
		},
		{
			id: '3',
			name: 'WebServer-Prod-01',
			ipAddress: '192.168.1.3',
			riskLevel: 'High',
			status: 'active',
			icon: 'server'
		},
		{
			id: '4',
			name: 'Database-Main',
			ipAddress: '192.168.1.4',
			riskLevel: 'High',
			status: 'active',
			icon: 'server'
		},
		{
			id: '5',
			name: 'LoadBalancer-01',
			ipAddress: '192.168.1.5',
			riskLevel: 'Medium',
			status: 'active',
			icon: 'server'
		},
		{
			id: '6',
			name: 'Application-Server-01',
			ipAddress: '192.168.1.6',
			riskLevel: 'Medium',
			status: 'active',
			icon: 'server'
		},
		{
			id: '7',
			name: 'FileServer-Backup',
			ipAddress: '192.168.1.7',
			riskLevel: 'Low',
			status: 'active',
			icon: 'server'
		},
		{
			id: '8',
			name: 'Monitoring-Node',
			ipAddress: '192.168.1.8',
			riskLevel: 'Low',
			status: 'active',
			icon: 'server'
		},
		{
			id: '9',
			name: 'API-Gateway',
			ipAddress: '192.168.1.9',
			riskLevel: 'Critical',
			status: 'active',
			icon: 'server'
		},
		{
			id: '10',
			name: 'Cache-Server-Redis',
			ipAddress: '192.168.1.10',
			riskLevel: 'High',
			status: 'active',
			icon: 'server'
		},
		{
			id: '11',
			name: 'Mail-Server',
			ipAddress: '192.168.1.11',
			riskLevel: 'Medium',
			status: 'active',
			icon: 'server'
		},
		{
			id: '12',
			name: 'DNS-Server-Primary',
			ipAddress: '192.168.1.12',
			riskLevel: 'Critical',
			status: 'active',
			icon: 'server'
		}
	];

	private riskSummaryData: IRiskSummary = {
		critical: 2,
		high: 5,
		medium: 0,
		low: 17,
		total: 0
	};

	private remediationTechniquesData: IRemediationTechnique[] = [
		{
			id: 'A',
			name: 'Remediation Technique A',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae tortor convallis vitae arcu. Magna.',
			assets: [
				{ id: '1', name: 'Lorem P', ipAddress: '192.168.1.1', riskLevel: 'Critical', status: 'active', icon: 'server' },
				{ id: '2', name: 'Lorem P', ipAddress: '192.168.1.2', riskLevel: 'Critical', status: 'active', icon: 'server' }
			]
		},
		{
			id: 'B',
			name: 'Remediation Technique B',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis viverra etiam pellentesque lectus semper in massa purus. Auctor aenean aenean senectus massa dignissim vehicula mi erat purus. Praesent scelerisque aliquet metus sagittis dictum sed sed. Sed venenatis sed urna quam.',
			assets: [
				{ id: '3', name: 'Lorem S', ipAddress: '192.168.1.3', riskLevel: 'High', status: 'active', icon: 'server' },
				{ id: '4', name: 'Lorem S', ipAddress: '192.168.1.4', riskLevel: 'High', status: 'active', icon: 'server' }
			]
		},
		{
			id: 'C',
			name: 'Remediation Technique C',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet elementum luctus odio. Id enim urna.',
			assets: [
				{ id: '5', name: 'Lorem T', ipAddress: '192.168.1.5', riskLevel: 'Medium', status: 'active', icon: 'server' },
				{ id: '6', name: 'Lorem T', ipAddress: '192.168.1.6', riskLevel: 'Medium', status: 'active', icon: 'server' }
			]
		}
	];

	private vulnerabilitiesData: IVulnerability[] = [
		{
			id: '1',
			title: 'Lorem Ipsum Dolor Sit',
			description: 'Critical vulnerability affecting multiple assets',
			affectedAssets: ['1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4'],
			severity: 'Critical',
			date: '2024-01-15'
		}
	];

	private assetCardsData: IAssetCard[] = [
		{
			id: '1261165940',
			name: 'Loremipsumdolorsit',
			ipAddress: '192.168.1.1',
			icon: 'server',
			status: 'error',
			metadata: [
				{ label: 'Lorem', value: 'Lorem "Ipsum"', highlight: 'yellow' },
				{ label: 'Loremipsum', value: 'Lorem 1234,5678', highlight: 'blue' }
			]
		},
		{
			id: '1261165941',
			name: 'Loremipsu',
			ipAddress: '',
			icon: 'server',
			status: 'normal',
			metadata: [
				{ label: 'Lorem', value: 'Loremipsum Loremipsum 1.2.3.4', highlight: 'purple' },
				{ label: '', value: '1.2.3.4 Loremipsum 1.2.3.4 1.2.3.4', highlight: 'purple' }
			]
		},
		{
			id: '1261165939',
			name: 'Loremipsumdolorsit002',
			ipAddress: '192.168.1.2',
			icon: 'server',
			status: 'error',
			metadata: [
				{ label: 'Lorem', value: 'Lorem "Ipsum"', highlight: 'yellow' },
				{ label: 'Loremipsum', value: 'Lorem 1234,5678', highlight: 'blue' }
			]
		},
		{
			id: '1261165942',
			name: 'Loremipsum',
			ipAddress: '',
			icon: 'server',
			status: 'normal',
			metadata: [
				{ label: 'Lorem', value: 'Lorem "Ipsum" Lorem Loremipsum Loremipsum', highlight: 'yellow' },
				{ label: '', value: '1.2.3.4 Loremipsum 1.2.3.4 1.2.3.4 Lorem 1234,5678', highlight: 'purple' },
				{ label: 'Lorem', value: 'Lorem "Ipsum" Loremipsum Loremipsum', highlight: 'yellow' },
				{ label: '', value: '1.2.3.4 1.2.3.4 Loremipsum Loremipsum 1.2.3.4 1.2.3.4', highlight: 'purple' }
			]
		}
	];

	constructor() {}

	getCurrentCVE(): any {
		return this.currentCVE;
	}

	getAssetFlow(): Observable<IAssetFlowNode[]> {
		return new Observable(observer => {
			observer.next(this.assetFlowData);
			observer.complete();
		});
	}

	getAssets(): Observable<IAsset[]> {
		return new Observable(observer => {
			observer.next(this.assetsData);
			observer.complete();
		});
	}

	getRiskSummary(): Observable<IRiskSummary> {
		return new Observable(observer => {
			observer.next(this.riskSummaryData);
			observer.complete();
		});
	}

	getRemediationTechniques(): Observable<IRemediationTechnique[]> {
		return new Observable(observer => {
			observer.next(this.remediationTechniquesData);
			observer.complete();
		});
	}

	getVulnerabilities(): Observable<IVulnerability[]> {
		return new Observable(observer => {
			observer.next(this.vulnerabilitiesData);
			observer.complete();
		});
	}

	getAssetCards(): Observable<IAssetCard[]> {
		return new Observable(observer => {
			observer.next(this.assetCardsData);
			observer.complete();
		});
	}
} 