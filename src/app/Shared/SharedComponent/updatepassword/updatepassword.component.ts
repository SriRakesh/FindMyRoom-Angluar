import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../../SharedServices/email.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../SharedClasses/passwordmatch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  hide: boolean;

  constructor(private service:EmailService,private toastr:ToastrService,private router: Router,private builder:FormBuilder) { }
  reset:FormGroup;
  ngOnInit() {
    this.reset=this.builder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.compose([Validators.required])],
    });
    this.hide=true;
  }
  get f()
  {
    return this.reset.controls;
  }

  onDone(){
    this.service.update(this.reset.value.email,this.reset.value.password).subscribe(res=>{
      if(res.code===1){
        this.toastr.success(res.message);
        this.router.navigate(['/features/booking/search']);
        //console.log(res.message);
      }
      if(res.code===2){
        this.toastr.error(res.message);
        //console.log(res.message);
      }
    });
  }
}
