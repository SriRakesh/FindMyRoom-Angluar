import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycustomerComponent } from './displaycustomer.component';
import { PartnerRoutingModule } from '../partner-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatMenuModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, MatRadioModule, MatFormFieldModule, MatOptionModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PartnerhomeComponent } from '../partnerhome/partnerhome.component';
import { ViewPropertiesComponent } from '../view-properties/view-properties.component';

export class Tost{
  warning(){}
  error(){}
}

fdescribe('DisplaycustomerComponent', () => {
  let component: DisplaycustomerComponent;
  let fixture: ComponentFixture<DisplaycustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaycustomerComponent,PartnerhomeComponent,ViewPropertiesComponent ],
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientModule,
        PartnerRoutingModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatCheckboxModule, 
        MatDialogModule,
        MatToolbarModule,
        MatRadioModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatOptionModule,

      ],
      providers:[{useClass:Tost,provide:ToastrService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaycustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('executing ngOnInit',()=>{
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngInit method that will display partner',()=>
  {
      component.ngOnInit();
      component.CustomArray=[];
      expect(component).toBeTruthy();
  });

  it('ngonint method that loads all the customers',()=>{
    component.loadAllCustomer;
    expect(component.loadAllCustomer).toBeTruthy();
  });
  it('ngOninit method',()=>{
    component.ngOnInit();
    expect(component.loadAllCustomer).toBeTruthy();
  });
});
