import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule }from './../../../Shared/SharedClasses/MaterialModule';
import { PartnerhomeComponent } from './partnerhome.component';

fdescribe('PartnerhomeComponent', () => {
  let component: PartnerhomeComponent;
  let fixture: ComponentFixture<PartnerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerhomeComponent ],
      imports:[
        MaterialModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
