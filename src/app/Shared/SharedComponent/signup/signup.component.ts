import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialog } from '@angular/material';
// import { AddRoomComponent } from '../add-room/add-room.component';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

import {Signup} from '../../SharedClasses/signup';
import { SignupServiceService } from '../../SharedServices/signup-service.service';
import {MustMatch} from '../../SharedClasses/passwordmatch';
import {ToastrService} from 'ngx-toastr';
import { UpdatePartnerServiceService } from '../../SharedServices/update-partner-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 // constructor() { }
  isAdmin:boolean = false;
  SignUp:FormGroup;
  name:string="";
  address:string="";
  submitted:boolean=false;
  constructor(private router:Router,private builder:FormBuilder,private updateservice:UpdatePartnerServiceService,
    private service:SignupServiceService,private toastr:ToastrService,
    public dialogRef:MatDialogRef<SignupComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }
  
    length:number=10;
  signup_details:Signup[];
  email:string;
  hide:boolean;

  ngOnInit() {
    if(localStorage.getItem('userType')=="Admin")
    {
      this.isAdmin = true;
    }
    this.SignUp=this.builder.group({
      FullName:['',[Validators.required]],
      Email:['',[Validators.required,Validators.email]],
      MobileNumber:['',Validators.compose([Validators.required,Validators.pattern('[6/7/8/9]{1}[0-9]{9}'),Validators.minLength(10),Validators.maxLength(10)])],
      Address:['',Validators.required],
      Password:['',Validators.compose([Validators.required])],
      ConfirmPassword:['',Validators.compose([Validators.required])],
      Type:['Renter',Validators.required]
    },
  {validator:MustMatch('Password','ConfirmPassword')});
  
  this.hide =true;
  }

  get f()
  {
    return this.SignUp.controls;
  }
  Onsubmit() {

    this.name=this.SignUp.value.FullName.trim();
    this.address=this.SignUp.value.Address.trim();
    if((this.name==="")&&(this.address==""))
    {
      this.toastr.error("name and address field should not be empty");
      return;
    }
    else if(this.name==="")
    {
      this.toastr.error("name field should not be empty");
      return;
    }
    else if(this.address=="")
    {
      this.toastr.error("address field should not be empty");
      return;
    }

    else if (this.SignUp.invalid || (this.SignUp.value.FullName.trim()==null)) {
        return;
    }
   else{
    this.service.post(this.SignUp.value).subscribe(res => {
       if(res.code === 0)
       {
         this.toastr.success(res.message);
       }
       if(res.code===1){
         this.toastr.error(res.message);
       }
       if(res.code==2)
       {
       this.toastr.error(res.message);
       }
      //  this.SignUp.reset();
      this.updateservice.dialogCloseCatcher();

    }); 
   this.dialogRef.close();
  }
  }
}

