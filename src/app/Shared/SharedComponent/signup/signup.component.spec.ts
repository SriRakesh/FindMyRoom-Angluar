import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule, MatSelectModule,MatRadioModule} from '@angular/material';
import { SignupComponent } from './signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule} from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrModule,ToastrService}  from 'ngx-toastr';
import { SignupServiceService} from '../../SharedServices/signup-service.service';
import { Signup } from '../../SharedClasses/signup';
export class ToastreMock{
error(){}
success(){}
}

const dialogMock = {
  close: () => { }
 };
fdescribe('SignupComponent', () => {
    // Begin by putting re-usable, preparatory code in a setup function instead of beforeEach().
    // The setup() function returns an object literal with the variables, such as app, that a test might reference.
    // You don't define semi-global variables (e.g., let app,fixture ) in the body of the describe().
    // Then each test invokes setup() in its first line, before continuing with steps that
    // manipulate the test subject and assert expectations.
  let component: SignupComponent;
  let signupservice: SignupServiceService;
  let fixture: ComponentFixture<SignupComponent>;
  let toastr:ToastreMock;
  beforeEach(async(() => {
    // The TestBed is the most important of the Angular testing utilities.
    // The TestBed creates a dynamically-constructed Angular test module that emulates an Angular @NgModule.
    // The TestBed.configureTestingModule() method takes a metadata object that can have most of the properties of an @NgModule.
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports:[MatFormFieldModule,MatDialogModule,BrowserAnimationsModule,ToastrModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule,MatIconModule,MatInputModule,MatButtonModule,MatRadioModule,MatSelectModule],
      providers :[{useClass:ToastreMock,provide:ToastrService},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },SignupServiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // component.ngOnInit();
  });
  // const userService = fixture.debugElement.injector.get(UserService);
  // spyOn(userService, 'getUser').and.returnValue(mockUser);
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.SignUp.valid).toBeFalsy();
  });
  // it('FullName field validity', ()=>{
  //   let FullName=component.SignUp.controls['FullName'];
  //   errors = FullName.errors || {}; 
  //   expect(errors['required']).toBeTruthy();

  //   FullName.setValue("asdf23456");
  //   errors = FullName.errors || {}; 
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['pattern']).toBeTruthy();

  //   FullName.setValue("shravani");
  //   errors = FullName.errors || {}; 
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['pattern']).toBeFalsy();
  // });
  
  it('executing ngOnInit',()=>{
    component.ngOnInit();
  })

  // it('submitting signup form',()=>{
  //  expect(component.SignUp.valid).toBeFalsy();
  //  component.SignUp.controls['FullName'].setValue("shravani");
  //  component.SignUp.controls['Email'].setValue("edaramshravani@gmail.com");
  //  component.SignUp.controls['MobileNumber'].setValue("9876543210");
  //  component.SignUp.controls['Address'].setValue("Siddipet");
  //  component.SignUp.controls['Password'].setValue("Shravani@123");
  //  component.SignUp.controls['ConfirmPassword'].setValue("Shravani@123");
  //  component.SignUp.controls['Type'].setValue("Partner");
  // component.Onsubmit();
  // expect(component.Onsubmit).toBeTruthy();
 // expect(toastr.success()).toHaveBeenCalledWith('successfully Registered', {closeButton: true});
   
  it('submitting signup form',()=>{
   //expect(component.SignUp.valid).toBeFalsy();
   component.SignUp.controls['FullName'].setValue("shravani");
   component.SignUp.controls['Email'].setValue("edaramshravani@gmail.com");
   component.SignUp.controls['MobileNumber'].setValue("9876543210");
   component.SignUp.controls['Address'].setValue("Siddipet");
   component.SignUp.controls['Password'].setValue("Shravani@123");
   component.SignUp.controls['ConfirmPassword'].setValue("Shravani@123");
   component.SignUp.controls['Type'].setValue("Partner");
   component.Onsubmit();
   expect(component.Onsubmit).toBeTruthy();
  });



  it('closing dialoge after submitting form',()=>{
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.Onsubmit();
    //expect(spy).toHaveBeenCalled(); 
  });
});

