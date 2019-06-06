import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasswordComponent } from './forgetpassword.component';
import { MatFormFieldModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../SharedServices/email.service';

export class ToastreMock{
  error(){}
  success(){}
  }
  
  const dialogMock = {
    close: () => { }
   };
fdescribe('ForgetpasswordComponent', () => {
  let component: ForgetpasswordComponent;
  let forgetpasswordservice:EmailService;
  let fixture: ComponentFixture<ForgetpasswordComponent>;
  let toastr:ToastreMock;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetpasswordComponent ],
      imports:[MatFormFieldModule,MatDialogModule,BrowserAnimationsModule,ToastrModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule,MatIconModule,MatInputModule,MatButtonModule,MatRadioModule,MatSelectModule],
      providers :[{useClass:ToastreMock,provide:ToastrService},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },ForgetpasswordComponent]
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.signup.valid).toBeFalsy();
  });

  it('executing ngOnInit',()=>{
    component.ngOnInit();
  })

  it('submitting signup form',()=>{
    expect(component.signup.valid).toBeFalsy();
    component.signup.controls['email'].setValue("edaramshravani123@gmail.com");
   });

  it('closing dialoge after submitting form',()=>{
   let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.Onsubmit();
  });
  it('closing dialoge after cancel form',()=>{
  let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.Onclick();
  });
});
