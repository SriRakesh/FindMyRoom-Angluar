import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ReceivedData  }from './../SharedClasses/ReceivedData';
import { Observable, from } from 'rxjs';
import {Booking} from './../SharedClasses/Booking';
import { Room, CurrentBookingRoom } from '../SharedClasses/room';

@Injectable({
  providedIn: 'root'
})
export class WishlistServiceService {

  renterId:number;
  roomId:number;
bookigInfo:Booking=new Booking();
roomToBeBooked:CurrentBookingRoom=new CurrentBookingRoom();





private headers:HttpHeaders;
//wishlistApi:string='http://localhost:52687/api/Booking';
wishlistApi:string='https://findmyroomwebapp.azurewebsites.net/api/Booking';
//wishlistApi:string='https://findmyroomwebapp-qa.azurewebsites.net/api/Booking';
//private RoomUrl = "https://findmyroomserverwebapp.azurewebsites.net/api";



constructor(private http:HttpClient) { 
  this.headers=new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
}

getWishlistedRooms(RenterId:number):Observable<ReceivedData>
{
return this.http.get<ReceivedData>(this.wishlistApi+"/ShowWishList/"+RenterId,{headers:this.headers});
}



// postWishlist(wishlist:WishListClass)
// {

//   return this.http.post<WishListClass>(this.wishlistApi+"/AddToWishList",wishlist,{headers:this.headers});

// }

postWishlist(payload)
{
return this.http.post<ReceivedData>(this.wishlistApi+"/AddToWishList",payload,{headers:this.headers});
}

removeWishList(payload):Observable<ReceivedData>
{
return this.http.post<ReceivedData>(this.wishlistApi+"/RemoveFromWishList",payload);
}

setBookingValues(roomReceived:CurrentBookingRoom)
{
  this.roomToBeBooked=roomReceived;

}

getBookingValues()
{
return this.roomToBeBooked;
}

finallyBook(bookingReceived:Booking):Observable<ReceivedData>
{
  console.log("booking recieved= renterId: "+bookingReceived.renterId+", roomId: "+bookingReceived.roomId);
  return this.http.post<ReceivedData>(this.wishlistApi+"/BookThisRoom",bookingReceived);
}

}