import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconUtils } from '../../../core/utils/icon.utils';
import { SidebarItem, UserProfile } from '../../../core/types';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule],
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

	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent): void {
		const target = event.target as HTMLElement;
		const menuItems = target
			.closest('ul')
			?.querySelectorAll('button[role="menuitem"]') as NodeListOf<HTMLElement>;

		if (!menuItems) return;

		const currentIndex = Array.from(menuItems).findIndex((item) => item === target);
		const totalItems = menuItems.length;

		switch (event.key) {
			case 'ArrowDown': {
				event.preventDefault();
				const nextIndex = (currentIndex + 1) % totalItems;
				menuItems[nextIndex]?.focus();
				break;
			}
			case 'ArrowUp': {
				event.preventDefault();
				const prevIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
				menuItems[prevIndex]?.focus();
				break;
			}
			case 'Home': {
				event.preventDefault();
				menuItems[0]?.focus();
				break;
			}
			case 'End': {
				event.preventDefault();
				menuItems[totalItems - 1]?.focus();
				break;
			}
		}
	}
}
