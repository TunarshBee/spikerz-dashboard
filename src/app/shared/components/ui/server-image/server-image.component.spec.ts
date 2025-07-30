import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerImageComponent } from './server-image.component';

describe('ServerImageComponent', () => {
	let component: ServerImageComponent;
	let fixture: ComponentFixture<ServerImageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ServerImageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ServerImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create and display server image', () => {
		expect(component).toBeTruthy();
	});

	it('should use default size when not provided', () => {
		expect(component.size).toBe('md');
	});

	it('should use provided size', () => {
		component.size = 'lg';
		fixture.detectChanges();

		expect(component.size).toBe('lg');
	});
});
