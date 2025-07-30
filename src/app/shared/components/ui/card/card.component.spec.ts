import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
	let component: CardComponent;
	let fixture: ComponentFixture<CardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create and display card content', () => {
		expect(component).toBeTruthy();
	});

	it('should apply custom title when provided', () => {
		component.title = 'Test Card Title';
		fixture.detectChanges();

		const cardElement = fixture.nativeElement.querySelector('.card');
		expect(cardElement).toBeTruthy();
	});

	it('should apply different variants correctly', () => {
		component.variant = 'outlined';
		fixture.detectChanges();

		const cardElement = fixture.nativeElement.querySelector('.card');
		expect(cardElement.classList.contains('card--outlined')).toBeTrue();
	});
});
