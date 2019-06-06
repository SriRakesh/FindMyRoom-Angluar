import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AddRoomServiceService } from 'src/app/Shared/SharedServices/add-room-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { flats } from 'src/app/Shared/SharedClasses/room';
//import { UpdateRoomComponent } from 'src/app/Shared/SharedComponent/update-room/update-room.component';
import { UpdateRoomComponent} from '../update-room/update-room.component';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import swal from 'sweetalert2';
import { ImagedisplayComponent } from 'src/app/Shared/SharedComponent/imagedisplay/imagedisplay.component';

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.css']
})
export class ViewPropertiesComponent implements OnInit, OnDestroy {

  flatArray:flats[] = [];
  isNoRooms:boolean=false;
  roomUnsubscriber: any;
  type:string;
  Admin:boolean=false;
  PartnerIdfromAdmin:number;
  //isAdmin:boolean = false;

  photos:any[];
  roomId:any;
  constructor(public dialog:MatDialog,private roomservice:AddRoomServiceService,private toastr:ToastrService,
   
    private router:Router) { }

  ngOnInit() {
    this.type=localStorage.getItem('userType');
    this.getRoomDetails();
    this.roomUnsubscriber = this.roomservice.addRoomCatcher.subscribe(isRoomUpdated => {
      if(isRoomUpdated){
        this.getRoomDetails();
        
        
      }
    });
  }
  getRoomDetails() {
    if(this.type === 'Admin')
    {
      this.PartnerIdfromAdmin = parseInt(localStorage.getItem('PartnerIdByAdmin'));
      this.roomservice.getroomdetailsforadmin(this.PartnerIdfromAdmin).subscribe(data=> {
        this.flatArray=data as flats[]
       
        if(data.code==2)
        this.isNoRooms=true;
        else
        this.isNoRooms=false;
    });
    }
    else{
    this.roomservice.getroomdetails().subscribe(data=> {
        this.flatArray=data as flats[]

        if(data.code==2)
        this.isNoRooms=true;
        else
        this.isNoRooms=false;
    });
  }
  }
  back(){
    if(this.type=="Admin"){
      this.router.navigate(['/features/admin/displaypartner']);
    }
    else{
    this.router.navigate(['/features/partner/partnerhome']);
    }
  }

  updateDialog(selectedItem:any) : void
  {
    console.log(selectedItem.roomId);
    this.roomservice.intermediateStore(selectedItem);
    this.dialog.open(UpdateRoomComponent,
      {
        width:'600px',
      });   
    this.getRoomDetails();
  }
  
  deleteDialog(selectedItem:any):void{
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
        console.log(selectedItem.roomId);
    this.roomservice.deleteRoomDetails(selectedItem.roomId,selectedItem).subscribe(
       data=>{
         if(data.code==1)
         {
           this.toastr.success(data.message);
           this.getRoomDetails();
         }
         else if(data.code==2)
         {
           this.toastr.error(data.message);
         }
       });
        this.getRoomDetails();
      }
    })
  
  }
 
  ViewDetails(selectedItem:any)
  {
    
  
    console.log(selectedItem);
    console.log("image selected");
       this.dialog.open(ImagedisplayComponent,
        {
            width:'600px',
            data:{selectedItem},
      }).afterClosed().subscribe(()=>{
       
        this.roomservice.refreshImage(selectedItem).subscribe();
      });
    }
  
  
    
  ngOnDestroy() {
    if(this.roomUnsubscriber){
      this.roomUnsubscriber.unsubscribe();
    }
  }
}



