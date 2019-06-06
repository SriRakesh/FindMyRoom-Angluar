import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Validators} from '@angular/forms';
import {Signup} from '../../../Shared/SharedClasses/signup';
import { SignupServiceService } from '../../../Shared/SharedServices/signup-service.service';
import { UpdatePartnerServiceService } from '../../../Shared/SharedServices/update-partner-service.service';
import {partner} from '../../../Shared/SharedClasses/partner';
import { FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-partner',
  templateUrl: './update-partner.component.html',
  styleUrls: ['./update-partner.component.css']
})
export class UpdatePartnerComponent implements OnInit {

  Update:FormGroup;
  submitted:boolean=false;
  name: any;
  address: any;
  constructor(private builder:FormBuilder,private toastr:ToastrService,private service1:UpdatePartnerServiceService,private service:SignupServiceService) { }
  length:number=10;
  signup_details:Signup[];
  email:string;
  partnerdata:partner;
  
  ngOnInit() {
    this.partnerdata=this.service1.getData();
    console.log(this.partnerdata);
    this.Update=this.builder.group({
        userId:[''],
        userName:['',Validators.required],
        userPassword:[''],
        userEmail:['',[Validators.required,Validators.email]],
        userPhoneNumber:['',Validators.compose([Validators.required,Validators.pattern('[6/7/8/9]{1}[0-9]{9}'),Validators.minLength(10),Validators.maxLength(10)])],
        userAddress:['',Validators.required],
        userType:['Partner'],
        userStatus:['invalid',Validators.required]
      })
this.Update.controls['userId'].setValue(this.partnerdata.userId);
this.Update.controls['userName'].setValue(this.partnerdata.userName);
this.Update.controls['userPassword'].setValue(this.partnerdata.userPassword);
this.Update.controls['userEmail'].setValue(this.partnerdata.userEmail);
this.Update.controls['userPhoneNumber'].setValue(this.partnerdata.userPhoneNumber);
this.Update.controls['userAddress'].setValue(this.partnerdata.userAddress);
this.Update.controls['userType'].setValue(this.partnerdata.userType);
this.Update.controls['userStatus'].setValue(this.partnerdata.userStatus);
    }
  

  geturl()
  {
    return "url('/src/assets/images/signup.jpg')"
  }

  get f()
  {
    return this.Update.controls;
  }
  Onsubmit(formData:partner) {

    if (this.Update.invalid) {
        return;
    }

    this.name=this.Update.value.userName.trim();
    this.address=this.Update.value.userAddress.trim();
    if(this.name=="")
    {
       this.toastr.error("Full Name should not be empty");
    }
    else if(this.address=="")
    {
      this.toastr.error("Address should not be empty");
    }
    else
    {
    this.service1.postData(formData.userId,formData).subscribe(res => {
      if(res.code==0)
      {
        this.toastr.success(res.message);
      }
      else
      {
        this.toastr.error(res.message);
      }
      this.service1.dialogCloseCatcher();
    });
  }
  
  }


  
  

}
