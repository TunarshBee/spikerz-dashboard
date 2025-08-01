import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { SidebarItem, UserProfile } from '../../../core/types';

describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;

	const mockSidebarItems: SidebarItem[] = [
		{ id: 'dashboard', icon: 'dashboard', label: 'Dashboard', active: true },
		{ id: 'vulnerabilities', icon: 'vulnerabilities', label: 'Vulnerabilities', active: false },
	];

	const mockUserProfile: UserProfile = {
		name: 'Lorem',
		email: 'lorem',
		avatar: '👤',
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SidebarComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;
		component.items = mockSidebarItems;
		component.userProfile = mockUserProfile;
		fixture.detectChanges();
	});

	it('should create and display sidebar items', () => {
		expect(component).toBeTruthy();
		expect(component.items).toEqual(mockSidebarItems);
	});

	it('should emit item click event when sidebar item is clicked', () => {
		spyOn(component.itemClick, 'emit');
		const testItemId = 'dashboard';

		component.onItemClick(testItemId);

		expect(component.itemClick.emit).toHaveBeenCalledWith(testItemId);
	});

	it('should emit toggle event when sidebar is toggled', () => {
		spyOn(component.toggleSidebar, 'emit');

		component.onToggleSidebar();

		expect(component.toggleSidebar.emit).toHaveBeenCalled();
	});
});
