import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
import {AddRoomServiceService} from '../../Shared/SharedServices/add-room-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {} from 'googlemaps';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { SearchService } from 'src/app/Shared/SharedServices/search.service';
import { Location } from '../../Shared/SharedClasses/signup';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit, AfterViewInit {
  address: string;
  location:string;
  lat: string="";
  lng: string="";
  RoomId:number;
  Geolocation:Location;

  constructor(private addroomservice:AddRoomServiceService,private mapsAPILoader: MapsAPILoader,private service:SearchService,
    public dialogRef:MatDialogRef<GooglemapComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {}   
  ngAfterViewInit(): void {
   this.RoomId=this.service.GetRoomId();
   if(this.RoomId==0)
   {
    this.address = this.addroomservice.GetMapaddress();
    console.log(this.address);
    this.addroomservice.getLocation(this.address).subscribe(data=>
      {
        this.lat = data.lat(),
        this.lng = data.lng(),
        this.addroomservice.lat=this.lat,
        this.addroomservice.lng=this.lng
      });
    }
    else
    {
      this.service.getGeolocation(this.RoomId).subscribe(data =>
        {
           this.Geolocation=data.set;
           this.lat=this.Geolocation[0].latitude;
           this.lng=this.Geolocation[0].longitude;
           console.log(this.Geolocation);
        });
      
    }
}
}
