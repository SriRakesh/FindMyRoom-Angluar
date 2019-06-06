import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaypartnerComponent } from './displaypartner.component';

describe('DisplaypartnerComponent', () => {
  let component: DisplaypartnerComponent;
  let fixture: ComponentFixture<DisplaypartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaypartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaypartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
