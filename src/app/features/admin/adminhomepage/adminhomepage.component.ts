import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdatePartnerServiceService } from 'src/app/Shared/SharedServices/update-partner-service.service';
import { SignupComponent } from 'src/app/Shared/SharedComponent/signup/signup.component';
import { partner } from 'src/app/Shared/SharedClasses/partner';
import { Router } from '@angular/router';
import { AddpartnerComponent } from '../addpartner/addpartner.component';

@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  styleUrls: ['./adminhomepage.component.css']
})
export class AdminhomepageComponent implements OnInit {

  constructor(public dialog:MatDialog,public myservice:UpdatePartnerServiceService,private router: Router) { }
  public PartnerData:partner[];
  status:string=null;
  ngOnInit() {
  }
  btnClick()
  {
    this.dialog.open(AddpartnerComponent,{
      width:'700px',
      height:'700px'
      });
      this.myservice.dialogCloseEvent.subscribe(res=>{
        if(res){
          this.dialog.closeAll();
          this.PartnerData=[];
  
          this.myservice.getPartners().subscribe((data:any)=>
          {
            if(data.code==0)
            {
              this.PartnerData=data.set;
            }
            else
            {
              this.status="Data is not loaded";
            }
          });
        }
      });
  }
  Back(){
    this.router.navigate(['/features/admin/displaypartner']);
  }
  displayUsers()
  {
    this.router.navigate(['/features/admin/getuserdetails']);
  }
  Remove()
  {
    this.router.navigate(['/features/admin/deletepartner']);
  }
}
