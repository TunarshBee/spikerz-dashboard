import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetFlowComponent } from './asset-flow.component';

describe('AssetFlowComponent', () => {
  let component: AssetFlowComponent;
  let fixture: ComponentFixture<AssetFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
