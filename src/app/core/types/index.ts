export type Asset = {
	id: string;
	name: string;
	ipAddress: string;
	riskLevel: RiskLevel;
	status: AssetStatus;
	icon: string;
};

export type Vulnerability = {
	id: string;
	title: string;
	description: string;
	affectedAssets: string[];
	severity: RiskLevel;
	date: string;
};

export type RemediationTechnique = {
	id: string;
	name: string;
	assets: Asset[];
	description: string;
};

export type AssetFlowNode = {
	id: string;
	name: string;
	ipAddress: string;
	icon: string;
	type: NodeType;
	connections?: string[];
	riskLevel?: RiskLevel;
};

export type RiskSummary = {
	critical: number;
	high: number;
	medium: number;
	low: number;
	total: number;
};

export type AssetCard = {
	id: string;
	name: string;
	ipAddress: string;
	icon: string;
	status: AssetCardStatus;
	metadata: Array<{
		label?: string;
		value: string;
		highlight?: HighlightColor;
	}>;
};

export type CVE = {
	id: string;
	description: string;
	extra: string;
};

export type SidebarItem = {
	id: string;
	icon: string;
	label: string;
	active: boolean;
};

export type UserProfile = {
	name: string;
	email: string;
	avatar: string;
};

export type AssetCardData = {
	name: string;
	ipAddress: string;
	icon: string;
	status: AssetCardStatus;
	metadata: Array<{
		label?: string;
		value: string;
		highlight?: HighlightColor;
	}>;
};

export type EndNodeCardData = {
	name: string;
	ipAddress: string;
	icon: string;
	status: AssetCardStatus;
	metadata: Array<{
		label?: string;
		value: string;
		highlight?: HighlightColor;
	}>;
};

export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type AssetStatus = 'active' | 'inactive';
export type NodeType = 'entry' | 'middle' | 'end';
export type AssetCardStatus = 'error' | 'normal';
export type HighlightColor = 'yellow' | 'blue' | 'purple' | 'green';
