import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../SharedServices/user-service.service';
import { partner } from '../../SharedClasses/partner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { userupdate } from '../../SharedClasses/userupdate';

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.css']
})
export class ProfileupdateComponent implements OnInit {

  constructor(private builder:FormBuilder,private router: Router,private toastr:ToastrService,private service:UserServiceService,public dialogRef:MatDialogRef<ProfileupdateComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }
  userdata:userupdate=new userupdate();
  Update:FormGroup;
  name: any;
  address: any;
  hide:boolean;
  ngOnInit() {
    // this.userdata=this.service.getData();
    // console.log(this.userdata);
    this.Update=this.builder.group({
        userId:[''],
        userName:['',Validators.required],
        userPhoneNumber:['',Validators.compose([Validators.required,Validators.pattern('[6/7/8/9]{1}[0-9]{9}'),Validators.minLength(10),Validators.maxLength(10)])],
        userAddress:['',Validators.required],
      });
      this.userdata=this.service.getData();
    if(this.userdata!==null && this.userdata!==undefined){
      // this.Update.setValue(this.userdata);

this.Update.controls['userId'].setValue(this.userdata.userId);
this.Update.controls['userName'].setValue(this.userdata.userName);
this.Update.controls['userPhoneNumber'].setValue(this.userdata.userPhoneNumber);
this.Update.controls['userAddress'].setValue(this.userdata.userAddress);
    }
    this.hide=true;
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
       this.toastr.error("user name should not be empty");
    }
    else if(this.address=="")
    {
      this.toastr.error("Address should not be empty");
    }
    else
    {
    this.service.update(formData).subscribe(res => {
      if(res.code==1)
      {
        this.toastr.success(res.message);
        this.service.addRoomSubscriber();
        this.dialogRef.close();
        this.router.navigate(['/features/profile']);
      }
      else
      {
        this.toastr.error(res.message);
      }
    });
  }
}

}
