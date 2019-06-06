import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { partner } from 'src/app/Shared/SharedClasses/partner';
import { UpdatePartnerServiceService } from 'src/app/Shared/SharedServices/update-partner-service.service';
import { GetuserdetailsComponent } from './getuserdetails.component';
import { RouterTestingModule} from '@angular/router/testing';


export class UpdatePartnerServiceMock{
  getUserData()
  {
    return [{"userId":1,"userName":"Hemangi","userPassword":"Pass@123","userEmail":"h@gmail.com","userPhoneNumber":"9823625945"
    ,"userAddress":"Nagpur","userType":"Partner","userStatus":"valid"}];

  }
  }
  fdescribe('GetuserdetailsComponent', () => {
  let component: GetuserdetailsComponent;
  let updatePartnerService:UpdatePartnerServiceService;
  let fixture: ComponentFixture<GetuserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetuserdetailsComponent ],
      imports:[RouterTestingModule],
      providers:[{useClass:UpdatePartnerServiceMock,provide:UpdatePartnerServiceService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetuserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('executing ngOnInit',()=>{
    component.ngOnInit();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load data',()=>{
    expect(component.UserData).toBeDefined();
  });
  it('should display message if data is not loaded',()=>{
    expect(component.status).toEqual('Data is not loaded');
  });
});
