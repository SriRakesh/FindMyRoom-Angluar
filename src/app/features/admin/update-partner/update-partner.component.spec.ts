import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule, MatSelectModule,MatRadioModule} from '@angular/material';
import { UpdatePartnerComponent } from '../update-partner/update-partner.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule} from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrModule,ToastrService}  from 'ngx-toastr';
import { SignupServiceService} from '../../../Shared/SharedServices/signup-service.service';
import { Signup } from '../../../Shared/SharedClasses/signup';
import {FormGroup,FormBuilder} from '@angular/forms';



export class ToastreMock{
error(){}
success(){}
}
const dialogMock = {
  close: () => { }
 };


fdescribe('UpdatePartnerComponent', () => {
 // Begin by putting re-usable, preparatory code in a setup function instead of beforeEach().
    // The setup() function returns an object literal with the variables, such as app, that a test might reference.
    // You don't define semi-global variables (e.g., let app,fixture ) in the body of the describe().
    // Then each test invokes setup() in its first line, before continuing with steps that
    // manipulate the test subject and assert expectations.
  let component: UpdatePartnerComponent;
  //let UpdatePartnerServiceService: UpdatePartnerServiceService;
  let fixture: ComponentFixture<UpdatePartnerComponent>;
  let toastr:ToastreMock;
  beforeEach(async(() => {
    // The TestBed is the most important of the Angular testing utilities.
    // The TestBed creates a dynamically-constructed Angular test module that emulates an Angular @NgModule.
    // The TestBed.configureTestingModule() method takes a metadata object that can have most of the properties of an @NgModule.
    TestBed.configureTestingModule({
      declarations: [ UpdatePartnerComponent ],
      imports:[MatFormFieldModule,MatDialogModule,BrowserAnimationsModule,ToastrModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule,MatIconModule,MatInputModule,MatButtonModule,MatRadioModule,MatSelectModule],
      providers :[{useClass:ToastreMock,provide:ToastrService},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.Update.valid).toBeFalsy();
  });
  
  it('executing ngOnInit',()=>{
    component.ngOnInit();
  })

  it('submitting update form',()=>{
   component.Update.controls['userId'].setValue("2");
   component.Update.controls['userName'].setValue("Hemangi");
   component.Update.controls['userPhoneNumber'].setValue("9876543210");
   component.Update.controls['userAddress'].setValue("Nagpur");
   component.Update.controls['userEmail'].setValue("Hemangi@gmail.com");
   expect(component.Update.valid).toBeTruthy();
   
  });

});
