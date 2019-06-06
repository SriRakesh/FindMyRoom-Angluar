import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UpdatePartnerServiceService } from 'src/app/Shared/SharedServices/update-partner-service.service';
import { partner } from 'src/app/Shared/SharedClasses/partner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deletepartner',
  templateUrl: './deletepartner.component.html',
  styleUrls: ['./deletepartner.component.css']
})
export class DeletepartnerComponent implements OnInit {
  public partnerData:partner[];
  //public partner pdata:new partner[];
  status:string=null;
  partnerUnsubscriber:any;

  constructor(private router:Router ,public dialog:MatDialog,public myservice:UpdatePartnerServiceService,private toastr:ToastrService) {
    myservice.getPartners().subscribe((data:any)=>{
      if(data.code == 0)
      {
        this.partnerData = data.set;
        console.log(this.partnerData);
      }
      else
      {
          this.status="Data is not loaded";
      }
    });
   }

  ngOnInit() {
    this.getPartnerDetails();
    this.partnerUnsubscriber=this.myservice.catchPartner.subscribe(isPartnerDeleted=>{
      if(isPartnerDeleted){
        this.getPartnerDetails();
      }
      });
  }
  Back(){
    this.router.navigate(['/features/admin/adminhome']);
  }
  getPartnerDetails() {
    this.myservice.getPartners().subscribe(data=> {
        this.partnerData =data.set as partner[];       
    });
  }
  deletePartner(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.myservice.deletePartner(id).subscribe(
          data=>{
            if(data.code==1)
            {
              this.toastr.success(data.message);
              this.myservice.partnerSubscriber();
              this.getPartnerDetails();
            }
            else if(data.code==2)
            {
              this.status="Data is not loaded";
            }
          });
          this.getPartnerDetails();
      }
    })
  }
  ngOnDestroy(){
    if(this.partnerUnsubscriber){
    this.partnerUnsubscriber.unsubscribe();
    } 
  }   
}