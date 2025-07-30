export class IconUtils {
	private static iconMap: { [key: string]: string } = {
		grid: 'fas fa-th',
		warning: 'fas fa-exclamation-triangle',
		cube: 'fas fa-cube',
		star: 'fas fa-star',
		wrench: 'fas fa-wrench',
		document: 'fas fa-file-alt',
		filter: 'fas fa-filter',
		settings: 'fas fa-cog',
		shield: 'fas fa-shield-alt',
		user: 'fas fa-user',
		server: 'fas fa-server',
		mask: 'fas fa-user-secret',
		database: 'fas fa-database',
		network: 'fas fa-network-wired',
		application: 'fas fa-code',
	};

	private static svgIconMap: { [key: string]: string } = {
		dashboard: '/icons/dashboard.svg',
		vulnerabilities: '/icons/vulnerabilities.svg',
		assets: '/icons/assets.svg',
		reports: '/icons/reports.svg',
		plug: '/icons/plug.svg',
		settings: '/icons/settings.svg',
		documentation: '/icons/documentation.svg',
		filters: '/icons/filters.svg',
	};

	static getIconClass(icon: string): string {
		return this.iconMap[icon] || 'fas fa-question';
	}

	static getSvgIcon(icon: string): string {
		return this.svgIconMap[icon] || '';
	}

	static isSvgIcon(icon: string): boolean {
		return icon in this.svgIconMap;
	}

	static getRiskLevelColor(level: string): string {
		switch (level) {
			case 'Critical':
				return 'red';
			case 'High':
				return 'orange';
			case 'Medium':
				return 'yellow';
			case 'Low':
				return 'green';
			default:
				return 'gray';
		}
	}
}
