import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconUtils } from '../../../core/utils/icon.utils';
import { SidebarItem, UserProfile } from '../../../core/types';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, TranslatePipe],
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
	@Input() items: SidebarItem[] = [];
	@Input() userProfile: UserProfile | null = null;
	@Input() collapsed: boolean = false;
	@Input() isMobile: boolean = false;

	@Output() itemClick = new EventEmitter<string>();
	@Output() toggleSidebar = new EventEmitter<void>();

	onItemClick(itemId: string): void {
		this.itemClick.emit(itemId);
	}

	onToggleSidebar(): void {
		this.toggleSidebar.emit();
	}

	getSvgIcon(icon: string): string {
		return IconUtils.getSvgIcon(icon);
	}

	isSvgIcon(icon: string): boolean {
		return IconUtils.isSvgIcon(icon);
	}
}
