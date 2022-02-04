import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTestComponent } from './sidebar-test.component';

describe('SidebarTestComponent', () => {
  let component: SidebarTestComponent;
  let fixture: ComponentFixture<SidebarTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
