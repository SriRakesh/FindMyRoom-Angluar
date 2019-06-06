import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search, Room } from './../SharedClasses/room'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '../SharedClasses/signup';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  //private RoomUrl = "http://localhost:53563/api";
 // private RoomUrl ="http://localhost:52687/api";

  private RoomUrl = "https://findmyroomwebapp.azurewebsites.net/api";
  //private RoomUrl="https://findmyroomwebapp-qa.azurewebsites.net/api";
  private header:HttpHeaders;
  
  
  search:Search = new Search();
  searchedrooms:Room[] = [];
  room:Room;
  RoomId:number=0;


  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService) {
    this.header = new HttpHeaders({'Content-Type':'application/json,charset=utf-8'});
   }
   

   getCity():Observable<any>
   {
     return this.http.get<any>(this.RoomUrl+'/Booking/Cities',{headers:this.header});
   }

   getSearchedRoomsAfterReload(searchData:Search)
  {
    return this.http.post<any>(this.RoomUrl+'/Booking/SearchedRooms',searchData,{headers : this.header}) 
  }  

  SetRoomId(RoomId:number)
  {
    this.RoomId=RoomId;
  }
  GetRoomId()
  {
  return this.RoomId;
  }
  getGeolocation(RoomId:number):Observable<any>
  {
    return this.http.get<any>(this.RoomUrl+'/Booking/Getlocation/'+RoomId,{headers : this.header})
  }

   getSearchedRooms(searchData:Search)
   { 
     this.search = searchData;
     return this.http.post<any>(this.RoomUrl+'/Booking/SearchedRooms',searchData,{headers : this.header})
     .subscribe(data => {
    if(data.code==1 )
    {
      this.searchedrooms = data.set;
      this.router.navigate(["/features/booking/display"]);
    }
    else if(data.code ==0)
    {
      return this.toastr.warning("no rooms are Available");
    }
    else if(data.code == 3) {
      return this.toastr.error("Invalid");
    }
    else {
     return this.toastr.error("Server Failure");
    }
    });
   }
 
  //  getFilterRooms(room:Room) :Observable<any>
  //  {
  //     this.room = room;
  //     this.searchedrooms = [];
  //     return this.http.post<any>(this.RoomUrl+'/Booking/Filter',room,{ headers:this.header })
  //  }

}
