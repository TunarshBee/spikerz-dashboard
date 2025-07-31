import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RemediationComponent } from './remediation.component';

describe('RemediationComponent', () => {
	let component: RemediationComponent;
	let fixture: ComponentFixture<RemediationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RemediationComponent, HttpClientTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(RemediationComponent);
		component = fixture.componentInstance;
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('should have showRemediation signal', () => {
		expect(component.showRemediation).toBeDefined();
		expect(component.showRemediation()).toBeFalse();
	});

	it('should toggle remediation visibility', () => {
		expect(component.showRemediation()).toBeFalse();

		component.toggleRemediation();

		expect(component.showRemediation()).toBeTrue();
	});
});
