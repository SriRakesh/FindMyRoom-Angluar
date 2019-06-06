import { Component, OnInit } from '@angular/core';
import { partner } from '../../SharedClasses/partner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserServiceService } from '../../SharedServices/user-service.service';
import { MatDialog } from '@angular/material';
import { ProfileupdateComponent } from '../profileupdate/profileupdate.component';
import { userdetails } from '../../SharedClasses/userdetails';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service:UserServiceService,private router: Router,private toastr:ToastrService,public dialog:MatDialog) { }
  user:userdetails=new userdetails();
  userLoginId:number;
  roomUnsubscriber: any;
  ngOnInit() {
    // this.service.dialogCloseEvent.subscribe(res => {
    //   if(res){
    //     this.dialog.closeAll();
    //   }
    // });
    this.getDetails();
    this.roomUnsubscriber = this.service.addCatcher.subscribe(isUpdated => {
      if(isUpdated){
        this.getDetails();
      }
    });
  }

  getDetails(){
    this.userLoginId=parseInt(localStorage.getItem('userId'));
    if(this.userLoginId!==null){
      this.service.post(this.userLoginId).subscribe(res=>{
        if(res.code===1){
          this.toastr.success(res.message);
          this.user=res.set[0];
          //console.log(res.message);
        }
        if(res.code===2){
          this.toastr.error(res.message);
          //console.log(res.message);
        }
        if(res.code===3){
          this.toastr.error(res.message);
          //console.log(res.message);
        }
  
      });
      
    }
  }

  onDone(){
    if(this.user.userType=="Renter")
        {
          this.router.navigate(['/features/booking/search']);
        }
        else if(this.user.userType=="Partner")
        {
          this.router.navigate(['/features/partner/partnerhome']);
        } 
        else{
          this.router.navigate(['/features/admin/adminhome']);
        }
  }
  update(users:any){
    this.service.setData(users);
    this.dialog.open(ProfileupdateComponent,{
      width:'650px',
      height:'600px'
      
      });
      // this.service.dialogCloseEvent.subscribe(res => {
      //   if(res){
      //     this.dialog.closeAll();
      //   }
      // });
       this.getDetails();
  }

  ngOnDestroy() {
    if(this.roomUnsubscriber){
      this.roomUnsubscriber.unsubscribe();
    }
  }

}
