export const RISK_LEVELS = {
	CRITICAL: 'Critical',
	HIGH: 'High',
	MEDIUM: 'Medium',
	LOW: 'Low',
} as const;

export const RISK_COLORS = {
	CRITICAL: 'critical',
	HIGH: 'high',
	MEDIUM: 'medium',
	LOW: 'low',
} as const;

export const ASSET_STATUS = {
	ACTIVE: 'active',
	INACTIVE: 'inactive',
} as const;

export const NODE_TYPES = {
	ENTRY: 'entry',
	MIDDLE: 'middle',
	END: 'end',
} as const;

export const ASSET_CARD_STATUS = {
	ERROR: 'error',
	NORMAL: 'normal',
} as const;

export const HIGHLIGHT_COLORS = {
	YELLOW: 'yellow',
	BLUE: 'blue',
	PURPLE: 'purple',
	GREEN: 'green',
} as const;
