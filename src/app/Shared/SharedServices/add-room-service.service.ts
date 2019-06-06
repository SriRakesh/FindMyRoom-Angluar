import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
 import {} from 'googlemaps';
 import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
 import { flats,UpdateRoom, Room, Addroom } from 'src/app/Shared/SharedClasses/room';
import { filter, map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
declare let google: any;


// interface Location{
//   latitude:string;
//   longitude:string;
// }


@Injectable({
  providedIn: 'root'
})

// imports:[
//   HttpClientModule
// ]

export class AddRoomServiceService  {

  public headers: HttpHeaders; 
  addRoomCatcher=new Subject<boolean>();
  room:flats;
   private url:string='https://findmyroomwebapp.azurewebsites.net/api/Rooms';
 //private url:string='http://localhost:52687/api/Rooms';
  flat:flats;
  storefeed:any;
  postupdateForm:UpdateRoom=new UpdateRoom();
  updateForm:any;
  keyId:any;
  deleteForm:any;
  rooms:Addroom = new Addroom;
  id:number;
  updatePhotoId:number;
  mapaddress:string;
  lat:string;
  lng:string;
  x:any;
  AdminId:number;

  constructor(private http:HttpClient,private mapsAPILoader: MapsAPILoader)
   { 
    this.headers=new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public storeId(selectedItem)
  {
    this.updatePhotoId=selectedItem;
  }
  public getId()
  {
    return this.updatePhotoId;
  }

  public getroomdetails():Observable<any>
  {
    this.id = parseInt(localStorage.getItem('userId'));
    return this.http.get<any>(this.url+ '/PartnerRooms/'+this.id, {headers: this.headers});
  }

  Mapaddress(address)
  {
    this.mapaddress = address;
    console.log(this.mapaddress);
  }

  GetMapaddress()
  {
    return this.mapaddress;
  }

  public getLocation(address: string): Observable<any> {
    console.log('Getting address: ', address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
        geocoder.geocode({
            'address': address
        }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0].geometry.location);
                observer.complete();
            } else {
                console.log('Error: ', results, ' & Status: ', status);
                observer.error();
            }
        });
    });
}
  public getroomdetailsforadmin(id:number):Observable<any>
  {
    return this.http.get<any>(this.url+ '/PartnerRooms/'+id, {headers: this.headers});
  }
  public postroomdetails(flat: any): Observable<any>
  {
  
  // this.ParnerId=parseInt(localStorage.getItem('userId'));
  this.rooms.PartnerId = parseInt(localStorage.getItem('userId'));
  this.rooms.RoomId = flat.RoomId;
  this.rooms.RoomCost = flat.RoomCost;
  this.rooms.RoomType = flat.RoomType;
  this.rooms.NumberOfRooms = flat.NumberOfRooms;
  this.rooms.Address = flat.Address;
  this.rooms.City = flat.City;
  this.rooms.Furniture = flat.Furniture;
  this.rooms.Description = flat.Description;
  this.rooms.Area = flat.Area;
  this.rooms.Pincode = flat.Pincode;
  this.rooms.Status = flat.Status;
  this.rooms.Latitude = "18.123456";
  this.rooms.Longitude = "13.1234567";
  // const addFlatRequest = JSON.stringify(flat);
  console.log(this.rooms);
  this.lat=null;
  this.lng=null;
  return this.http.post<any>(this.url + '/AddRoom', this.rooms, {headers: this.headers});
  
  } 
  //update a room
  public updateDetails(id,updateForm):Observable<any>
  {
    console.log(updateForm);
    //this.postupdateForm=updateForm;
    this.postupdateForm.RoomId=updateForm.RoomId;
    this.postupdateForm.Area=updateForm.Area;
    this.postupdateForm.Cost=updateForm.Cost;
    this.postupdateForm.City=updateForm.City;
    this.postupdateForm.Address=updateForm.Address;
    this.postupdateForm.Description=updateForm.Description;
    this.postupdateForm.Pincode=updateForm.Pincode;
    this.postupdateForm.RoomType=updateForm.RoomType;
    this.postupdateForm.Status=updateForm.Status;
    this.postupdateForm.NoOfBeds=updateForm.NoOfBeds;
    this.postupdateForm.Furniture=updateForm.Furniture;
    this.postupdateForm.Latitude=this.lat;
    this.postupdateForm.Longitude=this.lng;
    console.log(this.postupdateForm);
    this.lat=null;
    this.lng=null;
    const updateUrl = this.url+"/UpdateRoom/"+id;
    console.log(id);
    //console.log(this.postupdateForm.RoomCost); 
    //console.log(this.postupdateForm.cost); 


    const updateData=JSON.stringify(this.postupdateForm);
  
  return this.http.put<flats>(updateUrl,this.postupdateForm,{headers:this.headers});
  }
//put values in intermediate

public intermediateStore(selectedItem:any){
  this.storefeed=selectedItem;
  //this.keyId=this.storefeed.roomId;

}

public getIntermediate(){
  return this.storefeed;
}
  

public deleteRoomDetails(id, 
  deleteForm): Observable<any>
{
  const deleteUrl=this.url+'/DeleteRoom/'+id;
  console.log(id);
  console.log(deleteForm);
  return this.http.delete<any>(deleteUrl,{headers:this.headers})
}


addRoomSubscriber(){
  this.addRoomCatcher.next(true);
}


getPhotos(selectedItem):Observable<any>
  {
     const photoUrl='https://findmyroomwebapp.azurewebsites.net/api'+'/Photos/'+selectedItem;
    //const photoUrl='http://localhost:52687/api'+ '/Photos/'+selectedItem;
    return this.http.get<any>(photoUrl);
  }


  uploadmultiple(photo):Observable<any>
  {
    const formData=new FormData();
    formData.append('file',photo);
    
    return this.http.post(`https://findmyroomwebapp.azurewebsites.net/api/Photos/photos`,formData);
  //  return this.http.post(`http://localhost:52687/api/Photos/photos`,formData);
  }

  updateImage(selectedItem,photo):Observable<any>
  {
    const formdata=new FormData();
    formdata.append('file',photo);
    //return this.http.post(`http://localhost:52687/api/Photos/photos/${selectedItem}`,formdata);
   

      return this.http.post(`https://findmyroomwebapp.azurewebsites.net/api/Photos/photos/${selectedItem}`,formdata);
  }

  refreshImage(item)
  {
     //return this.http.get(`http://localhost:52687/api/${item}`);
    return this.http.get(`https://findmyroomwebapp.azurewebsites.net/api/${item}`);

    // return this.http.get(`https://findmyroomwebapp.azurewebsites.net/api/${item}`);

  }

  

  

}
