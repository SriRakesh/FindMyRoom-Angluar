import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/Shared/SharedServices/search.service';
import { Search, Room, CurrentBookingRoom } from 'src/app/Shared/SharedClasses/room';
import { FormControl,FormGroup, Validators }from '@angular/forms';
import { coerceNumberProperty} from '@angular/cdk/coercion';

import { WishListClass } from 'src/app/Shared/SharedClasses/WishListClass';
import { WishlistServiceService } from 'src/app/Shared/SharedServices/wishlist-service.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GooglemapComponent } from '../../googlemap/googlemap.component';
import { MatDialog } from '@angular/material';
import { AddRoomServiceService } from 'src/app/Shared/SharedServices/add-room-service.service';

@Component({
  selector: 'app-display-search',
  templateUrl: './display-search.component.html',
  styleUrls: ['./display-search.component.css']
})
export class DisplaySearchComponent implements OnInit {

  opened = false;

  room:Room=new Room();
  rooms : Room[] = [];
  Cities:string[]=[];
  userLoginId:string;
  userType:string;
  renterId:number;
  roomId:number;
 
  roomToBeBooked:CurrentBookingRoom=new CurrentBookingRoom();

  wishList:WishListClass =new WishListClass;
  addedWishListRow:WishListClass[]=[];
  message:string;

  price:number;
  furniture:string;
  noofrooms: number;
  area:string;
  search:Search = new Search();

  //constructor(private service:SearchService,private wishlistService:WishlistServiceService,private toastr:ToastrService,private router: Router) {
  
  constructor(private service:SearchService,private router: Router,public dialog: MatDialog,private wishlistService:WishlistServiceService,private toastr:ToastrService,
              private roomService:AddRoomServiceService) {

   }
 


  ngOnInit() {     
    this.search.city = localStorage.getItem('city');
    this.search.roomType = localStorage.getItem('roomType');

    if(this.search.city && this.search.roomType){
      this.service.getSearchedRoomsAfterReload(this.search)
      .subscribe(data => {
      if(data.code==1 )
        {
          this.rooms = data.set;
         
        }
      else if(data.code ==0)
        {
      return this.toastr.warning("No Rooms Available");
        }
      else if(data.code == 3) {
      return this.toastr.error("Invalid Input");
        }
      else {
      return this.toastr.error("Server Failure");
        }
      });
    } 
}


  addRoomTowishList(RoomId:number)
{
  this.userLoginId=localStorage.getItem('userId');
  this.userType=localStorage.getItem('userType');
  if(this.userLoginId!=null)
  {
    
    if(this.userType=="Renter")
    {
  console.log("login id: "+this.userLoginId);
  this.wishList.RenterId=parseInt(this.userLoginId);
  
  this.wishList.RoomId=RoomId;
  
  this.wishlistService.postWishlist(this.wishList).subscribe(data =>
    {
      if(data.code == 1)
      {
        console.log("add room wishlist data received is:");
        console.log(data);
        this.addedWishListRow = data.set; 
        this.message=data.message;
        this.toastr.success(data.message);
      }
      else{
        this.toastr.error(data.message);
      }
    }  );
  }
  else
 {
  this.toastr.warning("Please login as a 'Renter' to add to your wishlist");
 }
 }//
 else
 {
  this.toastr.warning("Please login as a 'Renter' to add to your wishlist");
 }
}

book(roomReceived:Room){

  this.userLoginId=localStorage.getItem('userId');
 
  if(this.userLoginId!=null)
  {
    
  Swal.fire({
    title: 'Proceed to booking?',
    text: "You will be redirected to booking page!",
    // type: 'info',
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
this.roomToBeBooked.room=roomReceived;
//this.roomToBeBooked.renterId=parseInt( localStorage.getItem('userId'));

this.roomToBeBooked.renterId=parseInt(this.userLoginId );
      this.wishlistService.setBookingValues(this.roomToBeBooked);
      this.router.navigate(['features/booking/booking-confirmation']);
    }
  })
  }//if
else
{
  this.toastr.warning("Please login as a 'Renter' to book the room");
}

}

ViewMap(RoomId:number)
{
  this.service.SetRoomId(RoomId);
  
  const dialogRef = this.dialog.open(GooglemapComponent, {
    width:'55%',
    height:'600px',
  }); 
  dialogRef.afterClosed().subscribe(result => {
  });

}

// ShowImage(selectedItem:any)
// {
//   this.roomService.RetrieveImage(selectedItem).subscribe();
// }

}
