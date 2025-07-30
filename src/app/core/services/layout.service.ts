import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
	providedIn: 'root',
})
export class LayoutService {
	private sidebarCollapsedSubject = new BehaviorSubject<boolean>(false);
	private isMobileSubject = new BehaviorSubject<boolean>(false);

	constructor() {
		this.checkScreenSize();
		window.addEventListener('resize', () => this.checkScreenSize());
	}

	private checkScreenSize(): void {
		const isMobile = window.innerWidth <= APP_CONSTANTS.LAYOUT.MOBILE_BREAKPOINT;
		this.isMobileSubject.next(isMobile);

		if (isMobile && this.sidebarCollapsedSubject.value === false) {
			this.sidebarCollapsedSubject.next(true);
		}
	}

	getSidebarCollapsed(): Observable<boolean> {
		return this.sidebarCollapsedSubject.asObservable();
	}

	getSidebarCollapsedValue(): boolean {
		return this.sidebarCollapsedSubject.value;
	}

	setSidebarCollapsed(collapsed: boolean): void {
		this.sidebarCollapsedSubject.next(collapsed);
	}

	toggleSidebar(): void {
		const current = this.sidebarCollapsedSubject.value;
		this.sidebarCollapsedSubject.next(!current);
	}

	isMobile(): Observable<boolean> {
		return this.isMobileSubject.asObservable();
	}

	getIsMobileValue(): boolean {
		return this.isMobileSubject.value;
	}
}
