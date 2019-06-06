import { Component, OnInit } from '@angular/core';
import { partner } from 'src/app/Shared/SharedClasses/partner';
import { UpdatePartnerServiceService } from 'src/app/Shared/SharedServices/update-partner-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getuserdetails',
  templateUrl: './getuserdetails.component.html',
  styleUrls: ['./getuserdetails.component.css']
})
export class GetuserdetailsComponent implements OnInit {

  UserData:partner[];
  status:string=null;

  constructor(public myservice:UpdatePartnerServiceService,private router:Router) 
  { 
    myservice.getUserData().subscribe((data:any)=>{
      if(data.code == 0)
      {
        this.UserData = data.set;
        console.log(this.UserData);
      }
      else
      {
          this.status="Data is not loaded";
      }
    });

  }
  Back(){
    this.router.navigate(['/features/admin/adminhome']);
  }
  ngOnInit() {
  }


}
