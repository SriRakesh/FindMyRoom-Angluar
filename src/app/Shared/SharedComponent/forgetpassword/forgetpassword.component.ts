import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { EmailService } from '../../SharedServices/email.service';
import {ToastrService} from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  
  constructor(private service:EmailService,private toastr:ToastrService,private builder:FormBuilder,public dialogRef:MatDialogRef<ForgetpasswordComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }
  // email=new FormControl('');
  signup:FormGroup;
  ngOnInit() {
    this.signup=this.builder.group({
      email:['',[Validators.required,Validators.email]]
    });
  }
  get f()
  {
    return this.signup.controls;
  }
  Onsubmit(){
    if(this.signup!==null && this.signup!==undefined && this.signup.value.email!=='' ){
      
    
    // this.toastr.success("success");
    this.service.post(this.signup.value.email).subscribe(res=>{
      if(res.code===1){
        this.toastr.success(res.message);
        this.dialogRef.close();
        //console.log(res.message);
      }
      if(res.code===2){
        this.toastr.error(res.message);
        //console.log(res.message);
      }

    });
  }
  else{
    this.toastr.error("Enter Email");
  }
  }
  Onclick(){
    // window.location.href="/features/booking/search";
    this.dialogRef.close();
  }

}
