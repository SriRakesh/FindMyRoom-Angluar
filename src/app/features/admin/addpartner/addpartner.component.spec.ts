import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule, MatSelectModule,MatRadioModule} from '@angular/material';
import { AddpartnerComponent } from './addpartner.component';
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


fdescribe('AddpartnerComponent', () => {
 // Begin by putting re-usable, preparatory code in a setup function instead of beforeEach().
    // The setup() function returns an object literal with the variables, such as app, that a test might reference.
    // You don't define semi-global variables (e.g., let app,fixture ) in the body of the describe().
    // Then each test invokes setup() in its first line, before continuing with steps that
    // manipulate the test subject and assert expectations.
  let component: AddpartnerComponent;
  let signupservice: SignupServiceService;
  let fixture: ComponentFixture<AddpartnerComponent>;
  let toastr:ToastreMock;
  beforeEach(async(() => {
    // The TestBed is the most important of the Angular testing utilities.
    // The TestBed creates a dynamically-constructed Angular test module that emulates an Angular @NgModule.
    // The TestBed.configureTestingModule() method takes a metadata object that can have most of the properties of an @NgModule.
    TestBed.configureTestingModule({
      declarations: [ AddpartnerComponent ],
      imports:[MatFormFieldModule,MatDialogModule,BrowserAnimationsModule,ToastrModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule,MatIconModule,MatInputModule,MatButtonModule,MatRadioModule,MatSelectModule],
      providers :[{useClass:ToastreMock,provide:ToastrService},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },SignupServiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.SignUp.valid).toBeFalsy();
  });
  
  it('executing ngOnInit',()=>{
    component.ngOnInit();
  })

  it('submitting signup form',()=>{
 
   component.SignUp.controls['FullName'].setValue("Hemangi");
   component.SignUp.controls['Email'].setValue("hemangi@gmail.com");
   component.SignUp.controls['MobileNumber'].setValue("9876543210");
   component.SignUp.controls['Address'].setValue("Nagpur");
   component.SignUp.controls['Password'].setValue("Pass@123");
   component.SignUp.controls['ConfirmPassword'].setValue("Pass@123");
   component.SignUp.controls['Type'].setValue("Partner");
   expect(component.SignUp.valid).toBeTruthy();
   
  });


  it('closing dialoge after submitting form',()=>{
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.Onsubmit(); 
  });
});