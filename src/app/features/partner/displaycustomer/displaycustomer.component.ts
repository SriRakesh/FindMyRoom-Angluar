import { Component, OnInit } from '@angular/core';
import { GetCustomerOfPartners } from 'src/app/Shared/SharedClasses/GetCustomerOfPartners';
import { PartnercustomerService } from 'src/app/Shared/SharedServices/partnercustomer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-displaycustomer',
  templateUrl: './displaycustomer.component.html',
  styleUrls: ['./displaycustomer.component.css']
})
export class DisplaycustomerComponent implements OnInit {

  CustomArray:GetCustomerOfPartners[];
  constructor(private service:PartnercustomerService,private router: Router) { }
  roomType:number;
  userLoginId:string;
  isNoCustomers:boolean=false;
  message:string;
  id:number;
  ngOnInit() {
    this.loadAllCustomer();
  }
Back(){
  this.router.navigate(['/features/partner/partnerhome']);
}

  loadAllCustomer(){
    this.userLoginId=localStorage.getItem('userId');
    
    if(this.userLoginId!=null)
    {
     
      console.log(this.userLoginId);
      this.id=parseInt(this.userLoginId);   
      this.service.getAllCustomer(this.id).subscribe(data=>{
        if(data.code==2)
        {
          this.isNoCustomers=true;
        }
        else
        {
          this.isNoCustomers=false;
          this.CustomArray=data;
        }
    });
  
  }
}
}
