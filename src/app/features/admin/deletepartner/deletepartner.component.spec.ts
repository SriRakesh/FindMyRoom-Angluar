import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepartnerComponent } from './deletepartner.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin-routing.module';
import { MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, MatRadioModule, MatFormFieldModule, MatOptionModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdatePartnerServiceService } from 'src/app/Shared/SharedServices/update-partner-service.service';
import { AdminhomepageComponent } from '../adminhomepage/adminhomepage.component';
import { DisplaypartnerComponent } from '../displaypartner/displaypartner.component';
import { GetuserdetailsComponent } from '../getuserdetails/getuserdetails.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

export class Tost{
  warning(){}
  error(){}
}

fdescribe('DeletepartnerComponent', () => {
  let component: DeletepartnerComponent;
  let fixture: ComponentFixture<DeletepartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletepartnerComponent,AdminhomepageComponent,DisplaypartnerComponent,GetuserdetailsComponent ],
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientModule,
        AdminRoutingModule,
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
    fixture = TestBed.createComponent(DeletepartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngInit method that will delete Partners',()=>{
    component.partnerData=[];
    expect(component).toBeFalsy();
  });
  it('ondelete method in the delete partner',()=>{
    //const service = fixture.debugElement.injector.get(UpdatePartnerServiceService);
    //spyOn(service,'getPartners').name
    component.deletePartner;
    expect(component.deletePartner).toBeTruthy();

  });
  it('ngoninit method',()=>{
    component.ngOnInit();
    expect(component.deletePartner).toBeTruthy();
  });
  it('ngoninit method',()=>
  {
    component.ngOnInit();
    expect(component).toBeTruthy();
  })
});