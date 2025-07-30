import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndNodeCardComponent, IEndNodeCardData } from './end-node-card.component';

describe('EndNodeCardComponent', () => {
	let component: EndNodeCardComponent;
	let fixture: ComponentFixture<EndNodeCardComponent>;

	const mockCardData: IEndNodeCardData = {
		name: 'Test End Node',
		ipAddress: '192.168.1.100',
		icon: 'server',
		status: 'normal',
		metadata: [
			{
				label: 'Status',
				value: 'Active',
				highlight: 'green',
			},
		],
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EndNodeCardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EndNodeCardComponent);
		component = fixture.componentInstance;
		component.cardData = mockCardData;
		fixture.detectChanges();
	});

	it('should create and display end node information', () => {
		expect(component).toBeTruthy();
		expect(component.cardData).toEqual(mockCardData);
	});

	it('should display node name and IP address', () => {
		const compiled = fixture.nativeElement;
		expect(compiled.textContent).toContain('Test End Node');
		expect(compiled.textContent).toContain('192.168.1.100');
	});

	it('should display metadata with correct highlighting', () => {
		expect(component.cardData.metadata.length).toBe(1);
		expect(component.cardData.metadata[0].highlight).toBe('green');
	});
});
