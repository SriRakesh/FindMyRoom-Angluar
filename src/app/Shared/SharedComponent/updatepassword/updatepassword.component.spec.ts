import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 

import { UpdatepasswordComponent } from './updatepassword.component';

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
 

fdescribe('UpdatepasswordComponent', () => {

 let component: UpdatepasswordComponent;

 let forgetpasswordservice:EmailService;

 let fixture: ComponentFixture<UpdatepasswordComponent>;

 let toastr:ToastreMock;

 beforeEach(async(() => {

 TestBed.configureTestingModule({

 declarations: [ UpdatepasswordComponent ],

 imports:[MatFormFieldModule,MatDialogModule,BrowserAnimationsModule,ToastrModule,HttpClientModule,RouterTestingModule,ReactiveFormsModule,MatIconModule,MatInputModule,MatButtonModule,MatRadioModule,MatSelectModule],

 providers :[{useClass:ToastreMock,provide:ToastrService},UpdatepasswordComponent]

 })

 .compileComponents();

 }));
 

 beforeEach(() => {

 fixture = TestBed.createComponent(UpdatepasswordComponent);

 component = fixture.componentInstance;

 fixture.detectChanges();

 });
 

 it('should create', () => {

 expect(component).toBeTruthy();

 });

 it('executing ngOnInit',()=>{

 component.ngOnInit();

 })

 it('submitting reset form',()=>{

 expect(component.reset.valid).toBeFalsy();

 component.reset.controls['email'].setValue("edaramshravani@gmail.com");

 component.reset.controls['password'].setValue("Sravani@123");

 component.onDone();

 expect(component.onDone).toBeTruthy();

 });
 

});