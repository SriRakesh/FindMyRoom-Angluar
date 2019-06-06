import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ImagedisplayComponent } from './imagedisplay.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 

describe('ImagedisplayComponent', () => {
  let component: ImagedisplayComponent;
  let fixture: ComponentFixture<ImagedisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagedisplayComponent ],
      imports:[HttpClientModule],
      providers:[{provide:MatDialogRef},{provide:MAT_DIALOG_DATA,useValue:[]}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('executing ngOnInit',()=>{
    component.ngOnInit();
  });
});
