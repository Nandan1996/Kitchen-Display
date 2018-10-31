import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenDisplayComponent } from './kitchen-display.component';

describe('KitchenDisplayComponent', () => {
  let component: KitchenDisplayComponent;
  let fixture: ComponentFixture<KitchenDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
