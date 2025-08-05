export interface IAssetFlowData {
	nodes: Array<{
		id: string;
		name: string;
		ipAddress: string;
		icon: string;
		type: string;
		connections?: string[];
		riskLevel?: string;
	}>;
	connections: Array<{
		from: string;
		to: string;
	}>;
}

export interface IVulnerabilityData {
	id: string;
	title: string;
	description: string;
	affectedAssets: string[];
	severity: string;
	date: string;
	cveId?: string;
	status?: string;
}
