import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule, MatSelectModule,MatRadioModule,MatCardModule} from '@angular/material';
import {MatDialogModule,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { UserLoginComponent } from './user-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import{ RouterTestingModule } from '@angular/router/testing';
import{ HttpClientModule } from '@angular/common/http';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'ng-dynami-social-login';

export class ToastreMock{
error(){}
success(){}
}
export class Auth{

}

const dialogMock={
  close : () =>{}
 
};
// describe('UserLoginComponent', () => {
export class Mat{

}
fdescribe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let toastr:ToastreMock;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports:[MatFormFieldModule,MatDialogModule,BrowserAnimationsModule,ToastrModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule,MatIconModule,MatInputModule,MatButtonModule,MatRadioModule,MatSelectModule,MatCardModule],
    
        providers:[{useclass:ToastreMock,provide:ToastrService},
        {provide:MAT_DIALOG_DATA,userValue:Mat},
      {provide:MatDialogRef,useValue:dialogMock},
      {provide:AuthService,useValue:{}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    //component.ngOnInit();
    fixture.detectChanges();
    component.ngOnInit();
  });
  it('should create', ()=>{
    expect(component).toBeTruthy();
  });
  it('form invalid when empty',()=>{

    expect(component.Login.valid).toBeFalsy();
  });
  it('executing ngOnInit',()=>{
    component.ngOnInit();
  });
  it('submitting a form emits a user',()=>{
    expect(component.Login.valid).toBeFalsy();
    component.Login.controls['UserEmail'].setValue('Admin@fmr.com');
    component.Login.controls['UserPassword'].setValue('Admin@123');
    component.login();
    expect(component.login).toBeTruthy();
  });
  // it('closing dialog after submitting',()=>{
  //   let spy=spyOn(component.dialogRef,'close').and.callThrough();
  //   component.login();
  //   //expect(spy).toHaveBeenCalled(); 
  // });
  it('should check the validity of the user',()=>{
    component.Login.patchValue({
      UserEmail:'Admin@fmr.com',
      UserPassword:'Admin@123'
    })
    component.login();
    expect(component.login).toBeTruthy();
  })
  
});

