import { Component, OnInit } from '@angular/core';
import { WishlistServiceService } from 'src/app/Shared/SharedServices/wishlist-service.service';
import { RoomsForWishlist } from 'src/app/Shared/SharedClasses/RoomsForWishlist';
import { Router } from '@angular/router';
import { WishListClass } from 'src/app/Shared/SharedClasses/WishListClass';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Room, CurrentBookingRoom } from 'src/app/Shared/SharedClasses/room';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  
  RenterId:number=3;
  showWishList:boolean=false;
  message:string;
  wishListedRooms:RoomsForWishlist[]=[];
  userLoginId:string;
  userName:string;
  loginStatus:boolean=false;
  userType:string;
newMessage:string;
wishList:WishListClass=new WishListClass;
wishListRemoved:WishListClass[]=[];
addedWishListRow:WishListClass[]=[];
isWishListEmpty:boolean=false;
availabilityOfRoom:string;

roomToBeBooked:CurrentBookingRoom=new CurrentBookingRoom();//to send booking room into service

  constructor(private wishlistService:WishlistServiceService,private router: Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.userLoginId=localStorage.getItem('userId');
this.userType=localStorage.getItem('userType');
// this.userType=this.userType.toLowerCase();


if(this.userLoginId!=null)
{
  if(this.userType=="Renter")
  {
  this.loginStatus=true;
  this.RenterId=parseInt(this.userLoginId);
this.userName=localStorage.getItem('userName');
 // debugger
    this.showWishList=true;
    this.wishlistService.getWishlistedRooms(this.RenterId).subscribe(data => {
      if(data.code == 1)
      {
        
        console.log("data received is:");
        console.log(data);
        this.wishListedRooms = data.set; 
        this.message=data.message;
        if(this.wishListedRooms.length==0)
        this.isWishListEmpty=true;
        else
        {
        this.isWishListEmpty=false;
        this.wishListedRooms.forEach(element => {
          element.isThereInWishList=1;
          element.availability=1;
          this.availabilityOfRoom=element.status.toLowerCase();

          if(this.availabilityOfRoom!="available")
          element.availability=0;
        });
      }
        //debugger
      }
      else
      {
        this.message=data.message;
      }
    });
     
  }
  else
  {
this.loginStatus=false;
    this.message="Please login as a 'Renter' to view your wishlist";
  }
   // console.log("userLoginId: "+this.userLoginId);
  }//
  else
  {
this.loginStatus=false;
    this.message="please login as a 'Renter' to view your wishlist";
  }

    
  }





  removeFromWishList(roomIdToRemove:number)
  {

this.wishList.RenterId=this.RenterId;
this.wishList.RoomId=roomIdToRemove;
this.wishlistService.removeWishList(this.wishList).subscribe(data => {
  if(data.code == 1)
  {
    this.wishListRemoved = data.set; 
    this.message=data.message;
    this.wishListedRooms.forEach(element => {
      if(element.roomId==roomIdToRemove)
      {
      element.isThereInWishList=0;
      } 
    });
    this.toastr.success(this.message);
  }
  else
  {
    this.message=data.message;
    this.toastr.error(this.message);
  }
});

  }

 


  


  addRoomTowishList(RoomIdToAdd:number)
{
  this.userLoginId=localStorage.getItem('userId');
  this.wishList.RenterId=parseInt(this.userLoginId);
  
  this.wishList.RoomId=RoomIdToAdd;
  
  this.wishlistService.postWishlist(this.wishList).subscribe(data =>
    {
      if(data.code == 1)
      {
        console.log("add room wishlist data received is:");
        console.log(data);
        this.addedWishListRow = data.set; 
        this.message=data.message;

        this.wishListedRooms.forEach(element => {
          if(element.roomId==RoomIdToAdd)
          {
          element.isThereInWishList=1;
          } 
        });

        this.toastr.success(data.message);

      }
      else{
        this.toastr.error(data.message);
      }
    }  );
 
}



  Back(){
    this.router.navigate(['/features/booking/search']);
  }

  book(roomReceived:Room){

    this.userLoginId=localStorage.getItem('userId');
  
      
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
  }
   
}
