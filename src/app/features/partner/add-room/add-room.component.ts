import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import  { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {flats} from 'src/app/Shared/SharedClasses/room';
import { Observable } from 'rxjs';
  import { filter, map } from 'rxjs/operators';
  import {MatDialog} from '@angular/material';

import { error } from 'util';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AddRoomServiceService } from 'src/app/Shared/SharedServices/add-room-service.service';
import {} from 'googlemaps';
import { GooglemapComponent } from '../../googlemap/googlemap.component';
import { SearchService } from 'src/app/Shared/SharedServices/search.service';

 @Component({
   selector: 'app-add-room',
   templateUrl: './add-room.component.html',
   styleUrls: ['./add-room.component.css']
 })





export class AddRoomComponent implements OnInit {


    private headers:HttpHeaders;
    fileToUpload: File = null;
    public roomForm:FormGroup;
    flat:flats[];
    successMgs='post submitted';
    errorMsg="post unsuccessfull";
    valid:Number=1;
    address:string;
    option:string;
    mapaddress:string;
    photoFiles:File[]=[];
    @ViewChild('fileInput') fileInput:ElementRef
    submitted:boolean=false;



    constructor(private httpService:HttpClient,private service:SearchService,private addRoomService:AddRoomServiceService,
      private formBuilder:FormBuilder,private router : Router,private toastr:ToastrService,public dialog: MatDialog,
      public dialogRef:MatDialogRef<AddRoomComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {

      this.headers=new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    }

    

  ngOnInit() {
    this.AddRoom();
  }
  AddRoom(){
    this.roomForm=this.formBuilder.group({

        RoomType:['',[Validators.required]],
        RoomCost : ['',[Validators.required,Validators.min(999),Validators.max(50000)]],
        NumberOfRooms:['',[Validators.required,Validators.min(1),Validators.max(5)]],
        City:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15),Validators.pattern("^[a-zA-Z]+$")]],
        Area:['',Validators.required],
        Address:['',Validators.required],
        Furniture:['',Validators.required],
        Description:['',[Validators.required,Validators.minLength(10),Validators.maxLength(250)]],
        Pincode:['',[Validators.required,Validators.pattern("[0-9]{6}")]]
       });

      }

      view(){

        this.mapaddress =this.roomForm.value.Area +" "+ this.roomForm.value.City;
        this.addRoomService.Mapaddress(this.mapaddress);
        this.service.SetRoomId(0);
        const dialogRef = this.dialog.open(GooglemapComponent, {
          width:'55%',
          height:'600px',
        }); 
        dialogRef.afterClosed().subscribe(result => {
        });

      }
   
      setlatlng()
      {
        const mapAddress = this.roomForm.value.Area + "" + this.roomForm.value.City;
        this.addRoomService.getLocation(mapAddress).subscribe(locationData => {
          this.addRoomService.lat = locationData.lat();
          this.addRoomService.lng = locationData.lng();
          
        });
      }

     submit()
      {
      if(!this.roomForm.invalid){
         //this.setlatlng();
        this.postRoomDetails();
      }
      }
    postRoomDetails(){
      // this.addRoomService.postroomdetails(this.roomForm.value).subscribe(    
      //   data=>{
      //     if(data.code==1)
      //     {
           // this.postImagesForRoom();
        var nativeElement:HTMLInputElement= this.fileInput.nativeElement;
        if(this.roomForm.invalid)
        {
          return;
        }
        
       
        if(nativeElement.value=='')
        {
          this.toastr.error("file not uploaded");
        }
        else
        {

          if(!this.validateFile(nativeElement.files[0].name))
          {
            
           this.toastr.error("Png or Jpeg formats are supported");
          }
          else
          {
            this.addRoomService.postroomdetails(this.roomForm.value).subscribe(
             data=>{
    
              if(data.code==1)
              {
                
                this.addRoomService.uploadmultiple(nativeElement.files[0]).subscribe((res:any)=>{
       
                  if(res.code==1)
                  {
                    this.toastr.success("Room Details are added successfully");
                    this.dialogRef.close();
                    this.addRoomService.addRoomSubscriber();
                    this.router.navigate(['/partner/partnerhome/'])
                  }
                  else if(res.code==2)
                  {
                    this.toastr.error("Failed to update Room details");
                  }

              });
            }
          

              else{
                this.toastr.error("Failed to Update Room Details");
              }
            });

         }
      }
        //   }
        // });
      }
        validateFile(name:string)
        {
            var txt=name.substring(name.lastIndexOf('.')+1);
            if(txt.toLowerCase()=='png'||txt.toLowerCase()=='jpeg'||txt.toLowerCase()=='jpg')
            {
              return true;
            }
            
            else{
              return false;
            }
        }


}
