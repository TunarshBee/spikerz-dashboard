export interface IAsset {
	id: string;
	name: string;
	ipAddress: string;
	riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
	status: 'active' | 'inactive';
	icon: string;
}

export interface IVulnerability {
	id: string;
	title: string;
	description: string;
	affectedAssets: string[];
	severity: 'Critical' | 'High' | 'Medium' | 'Low';
	date: string;
}

export interface IRemediationTechnique {
	id: string;
	name: string;
	assets: IAsset[];
	description: string;
}

export interface IAssetFlowNode {
	id: string;
	name: string;
	ipAddress: string;
	icon: string;
	type: 'entry' | 'middle' | 'end';
	connections?: string[];
	riskLevel?: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface IRiskSummary {
	critical: number;
	high: number;
	medium: number;
	low: number;
	total: number;
}

export interface IAssetCard {
	id: string;
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

export interface ICVE {
	id: string;
	description: string;
	extra: string;
}
