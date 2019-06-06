import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialog } from '@angular/material';
// import { AddRoomComponent } from '../add-room/add-room.component';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Validators} from '@angular/forms';;
import { SignupServiceService } from '../../../Shared/SharedServices/signup-service.service';
import {MustMatch} from '../../../Shared/SharedClasses/passwordmatch';
import {ToastrService} from 'ngx-toastr';
import { UpdatePartnerServiceService } from '../../../Shared/SharedServices/update-partner-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import {Signup} from '../../../Shared/SharedClasses/signup';

@Component({
  selector: 'app-addpartner',
  templateUrl: './addpartner.component.html',
  styleUrls: ['./addpartner.component.css']
})
export class AddpartnerComponent implements OnInit {

  isAdmin:boolean = false;
  SignUp:FormGroup;
  name:string;
  address:string;
  submitted:boolean=false;
  constructor(private router:Router,private builder:FormBuilder,private service1:UpdatePartnerServiceService,private service:SignupServiceService,private toastr:ToastrService,
    public dialogRef:MatDialogRef<AddpartnerComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }
  length:number=10;
  signup_details:Signup[];
  email:string;

  ngOnInit() {
   
    this.SignUp=this.builder.group({
      FullName:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      MobileNumber:['',Validators.compose([Validators.required,Validators.pattern('[6/7/8/9]{1}[0-9]{9}'),Validators.minLength(10),Validators.maxLength(10)])],
      Address:['',Validators.required],
      // UserName:['',Validators.required],
      Password:['',Validators.compose([Validators.required])],
      ConfirmPassword:['',Validators.compose([Validators.required])],
      Type:['Partner']
    },
  {validator:MustMatch('Password','ConfirmPassword')});
  }

  geturl()
  {
    return "url('/src/assets/images/signup.jpg')"
  }

  get f()
  {
    return this.SignUp.controls;
  }
  Onsubmit() {

    // if (this.SignUp.invalid) {
    //     //return;
    // }

    this.name=this.SignUp.value.FullName.trim();
    this.address=this.SignUp.value.Address.trim();
    
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
    this.service.post(this.SignUp.value).subscribe(res => {
     
       if(res.code === 0){
         this.toastr.success(res.message); 
          this.router.navigate(['/features/admin/adminhome']);
         
       }
       if(res.code===1){
         this.toastr.error(res.message);
         this.dialogRef.close();
       }
       if(res.code==2)
       {
       this.toastr.error(res.message);
       }
      //  this.SignUp.reset();
       this.service1.dialogCloseCatcher();
    }); 
  }
}
}
