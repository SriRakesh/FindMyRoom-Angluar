import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertiesComponent } from './view-properties.component';
import { MatCardModule ,MatDialogModule}  from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { ToastrModule,ToastrService}  from 'ngx-toastr';
import { RouterTestingModule} from '@angular/router/testing';



fdescribe('ViewPropertiesComponent', () => {
  let component: ViewPropertiesComponent;
  let fixture: ComponentFixture<ViewPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPropertiesComponent ],
      imports:[MatCardModule,MatDialogModule,HttpClientModule, ToastrModule.forRoot(),RouterTestingModule],
      providers:[MapsAPILoader]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('executing ngOnInit',()=>{
    component.ngOnInit();
  });

  it('get room details',()=>{
    expect(component.getRoomDetails).toBeTruthy();
  });

  it('get back details',()=>{
     expect(component.back).toBeTruthy();
  })

  it('get update dialog ',()=>{
    expect(component.updateDialog).toBeTruthy();
  });

  it('get delete dialog ',()=>{
    expect(component.deleteDialog).toBeTruthy();
  })


  it('view details function',()=>{
    expect(component.ViewDetails).toBeTruthy();
  })
  it('call referesh image',()=>{
    component.ngOnDestroy();
  })

});
