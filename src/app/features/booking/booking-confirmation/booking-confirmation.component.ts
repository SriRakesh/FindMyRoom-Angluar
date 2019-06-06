import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Shared/SharedClasses/Booking';
import { CurrentBookingRoom } from 'src/app/Shared/SharedClasses/room';

import { WishlistServiceService } from 'src/app/Shared/SharedServices/wishlist-service.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {

bookingInfo:Booking=new Booking();

roomToBeBooked:CurrentBookingRoom=new CurrentBookingRoom();

roomToBeBookedHere:CurrentBookingRoom=new CurrentBookingRoom();




// public roomId:number=0;
// public cost:number=0;
// public noOfBeds:number=0; // main program  it is integer.
// public city:string='';
// public area:string='';
// public roomType:string='';
// public furniture:string='';
// public description:string='';
public pincode:number=0;
  constructor(private bookingService:WishlistServiceService,private toastr:ToastrService,private router: Router) { }

  ngOnInit() {
    this.showTheRoomToBeBooked();
  }

showTheRoomToBeBooked(){
this.roomToBeBooked=this.bookingService.getBookingValues();
if(this.roomToBeBooked.renterId!=0)
{
  localStorage.setItem('renterIdOfBooking',(this.roomToBeBooked.renterId).toString());
localStorage.setItem('roomIdBooking',(this.roomToBeBooked.room.roomId).toString());
localStorage.setItem('costBooking',(this.roomToBeBooked.room.cost).toString());
localStorage.setItem('noOfBedsBooking',(this.roomToBeBooked.room.noOfBeds).toString());
localStorage.setItem('cityBooking',(this.roomToBeBooked.room.city));
localStorage.setItem('areaBooking',(this.roomToBeBooked.room.area));
localStorage.setItem('roomTypeBoooking',(this.roomToBeBooked.room.roomType));
localStorage.setItem('furnitureBooking',(this.roomToBeBooked.room.furniture));
localStorage.setItem('descriptionBooking',(this.roomToBeBooked.room.description));
}
else{
  this.roomToBeBooked.renterId=parseInt( localStorage.getItem('renterIdOfBooking'));
  this.roomToBeBooked.room.roomId=parseInt( localStorage.getItem('roomIdBooking'));
  this.roomToBeBooked.room.cost=parseInt( localStorage.getItem('costBooking'));
  this.roomToBeBooked.room.noOfBeds=parseInt( localStorage.getItem('noOfBedsBooking'));
  this.roomToBeBooked.room.city=localStorage.getItem('cityBooking');
  this.roomToBeBooked.room.area=localStorage.getItem('areaBooking');
  this.roomToBeBooked.room.roomType=localStorage.getItem('roomTypeBoooking');
  this.roomToBeBooked.room.furniture=localStorage.getItem('furnitureBooking');
  this.roomToBeBooked.room.description=localStorage.getItem('descriptionBooking');

}

}

finallyBook(){
  this.bookingInfo.renterId=this.roomToBeBooked.renterId;
  this.bookingInfo.roomId=this.roomToBeBooked.room.roomId;
  this.bookingService.finallyBook(this.bookingInfo).subscribe(
    data=>
    {
      if(data.code==1)
      {
      this.bookingInfo=data.set[0];
      console.log("booking success");
      
      Swal.fire({
        type: 'success',
    title:'Congratulations!',
    text: "Successfully booked the room",
    
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ok'
      }).then((result) => {
        if (result.value) 
        {
          this.router.navigate(['/features/booking/search']);
        } 
          
        })
      }
      else
      {
      console.log("error message: "+data.message);
      this.toastr.warning(data.message);
      }
    }
  )

  
}

}
