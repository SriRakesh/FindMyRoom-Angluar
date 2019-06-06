import { Component, OnInit } from '@angular/core';
import { AddRoomComponent } from '../add-room/add-room.component';
import { AddRoomServiceService } from '../../../Shared/SharedServices/add-room-service.service';
import { flats } from '../../../Shared/SharedClasses/room';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UpdateRoomComponent } from '../update-room/update-room.component';
//import { } from 

@Component({
  selector: 'app-partnerhome',
  templateUrl: './partnerhome.component.html',
  styleUrls: ['./partnerhome.component.css']
})
export class PartnerhomeComponent implements OnInit {

  flatArray:flats[] = [];
  public deleteForm:FormGroup;
  isAdded:boolean;
  isViewProperty:boolean=false;

  constructor(public dialog:MatDialog,private roomservice:AddRoomServiceService,private toastr:ToastrService,
              private router:Router) { }

  ngOnInit() {
    this.getRoomDetails();
    this.roomservice.addRoomCatcher.subscribe(roomadded => {
      if(roomadded){
        this.getRoomDetails();
    }
    });
    
  }
  getRoomDetails() {
    this.roomservice.getroomdetails().subscribe(data=> {
        this.flatArray=data as flats[]
    });
  }
  openDialog(): void {
    
    this.dialog.open(AddRoomComponent, {
      width: '600px',
      height:'700px',
    });
  }
    updateDialog(selectedItem:any) : void
    {
      console.log(selectedItem.roomId);
      this.roomservice.intermediateStore(selectedItem);
      this.dialog.open(UpdateRoomComponent,
        {
        width:'600px',
        height:'720px',
      
      });
    }

    deleteDialog(selectedItem:any):void{
      console.log(selectedItem.roomId);
      //console.log(this.deleteForm);
      this.roomservice.deleteRoomDetails(selectedItem.roomId,selectedItem).subscribe(
         data=>{
           if(data.code==1)
           {
             this.toastr.success(data.message);
             this.getRoomDetails();
           }
           else if(data.code==2)
           {
             this.toastr.error(data.message)
           }
         }
      );

      // this.dialog.open(DeleteroomComponent,
      //   {
      //     width:'600px',
      //   })
    }


//     viewProperties()
//     {
// if(this.isViewProperty==false)
// this.isViewProperty=true;
// else
// this.isViewProperty=false;
//     }

    // Back(){
    //   this.router.navigate(['/features/booking/search']);
    // }

    viewProperties()
    {
      this.router.navigate(['/features/partner/viewproperties']);
    }
}
