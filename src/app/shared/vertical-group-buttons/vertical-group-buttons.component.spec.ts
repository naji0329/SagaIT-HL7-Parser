import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalGroupButtonsComponent } from './vertical-group-buttons.component';

describe('VerticalGroupButtonsComponent', () => {
  let component: VerticalGroupButtonsComponent;
  let fixture: ComponentFixture<VerticalGroupButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalGroupButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalGroupButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
