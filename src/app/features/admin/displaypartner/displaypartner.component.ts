import { Component, OnInit } from '@angular/core';
import { UpdatePartnerServiceService } from '../../../Shared/SharedServices/update-partner-service.service';
import {partner} from '../../../Shared/SharedClasses/partner';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import { UpdatePartnerComponent } from '../update-partner/update-partner.component';
import { Router } from '@angular/router';
import { AddpartnerComponent } from '../../../features/admin/addpartner/addpartner.component';
import { AddRoomServiceService } from 'src/app/Shared/SharedServices/add-room-service.service';
import { parse } from 'querystring';

@Component({
  selector: 'app-displaypartner',
  templateUrl: './displaypartner.component.html',
  styleUrls: ['./displaypartner.component.css']
})
export class DisplaypartnerComponent implements OnInit {

  public PartnerData:partner[];
  id:number;
  status:string=null;
  AdminId:number;

  constructor(private router:Router,private roomservice:AddRoomServiceService ,public dialog:MatDialog,public myservice:UpdatePartnerServiceService) { 
    myservice.getPartners().subscribe((data:any)=>{
      if(data.code == 0)
      {
        this.PartnerData = data.set;
      }
      else
      {
          this.status="Data is not loaded";
      }
    });
  }

  
  ngOnInit() {
    this.myservice.dialogCloseEvent.subscribe(res => {
      if(res){
        this.dialog.closeAll();
      }
    });
  
  }
 
  
   updateDetails( partners:any):void{
  
    this.myservice.setData(partners); 
    // this.router.navigate(['/update-partner']);
   this.dialog.open(UpdatePartnerComponent,{
    width:'650px',
    height:'650px'
    
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
      this.router.navigate(['/features/admin/adminhome']);
    }
    View(id:number)
    {
      this.roomservice.AdminId=id;
      localStorage.setItem('PartnerIdByAdmin',id.toString());
      this.router.navigate(['/features/partner/viewproperties']);
    }
       
  }    

  