import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddRoomServiceService } from '../../../Shared/SharedServices/add-room-service.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { flats, Room } from '../../../Shared/SharedClasses/room';
import { ToastrService } from 'ngx-toastr';
import {} from 'googlemaps';
import { GooglemapComponent } from '../../googlemap/googlemap.component';
import { SearchService } from 'src/app/Shared/SharedServices/search.service';


@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent implements OnInit {

  public updateForm:FormGroup;
  mapaddress:string;
  public refillform:any;
  @ViewChild('fileInput') fileInput:ElementRef

    constructor(private httpService:HttpClient,private service:SearchService,private addRoomService:AddRoomServiceService,
    private formBuilder:FormBuilder,private router : Router,private toastr:ToastrService,public dialog: MatDialog,
    public dialogRef:MatDialogRef<UpdateRoomComponent>,@Inject(MAT_DIALOG_DATA) public data:any

    
    
    ) { }

  ngOnInit() {
    this.updateRoom();
  }

  updateRoom(){

    this.refillform=this.addRoomService.getIntermediate();
    this.updateForm=this.formBuilder.group({
      RoomId:[''],
      Cost : ['',[Validators.required,Validators.min(999),Validators.max(50000)]],
      NoOfBeds:[(this.refillform.noOfBeds)?this.refillform.noOfBeds:'' ,[Validators.required,Validators.min(1),Validators.max(5)]],
      City:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15),Validators.pattern("^[a-zA-Z]+$")]],
      Area:['',Validators.required],
      Address:['',Validators.required],
      Furniture:['',Validators.required],
      Description:['',[Validators.required,Validators.minLength(10),Validators.maxLength(250)]],
      // Images:['',Validators.required]
      Pincode:['',[Validators.required,Validators.pattern("[0-9]{6}")]],
      RoomType : ['',[Validators.required]],
      Status : [''],
     });

    
     this.updateForm.controls['RoomId'].setValue(this.refillform.roomId);
     this.updateForm.controls['Cost'].setValue(this.refillform.cost);
    // this.updateForm.controls['NoOfBeds'].setValue(parseInt(this.refillform.noOfBeds));
     this.updateForm.controls['City'].setValue(this.refillform.city);
     this.updateForm.controls['Area'].setValue(this.refillform.area);
     this.updateForm.controls['Address'].setValue(this.refillform.address);
     this.updateForm.controls['RoomType'].setValue(this.refillform.roomType);
      this.updateForm.controls['Furniture'].setValue(this.refillform.furniture);
      this.updateForm.controls['Description'].setValue(this.refillform.description);
      this.updateForm.controls['Pincode'].setValue(this.refillform.pincode);
      this.updateForm.controls['RoomType'].setValue(this.refillform.roomType);
      this.updateForm.controls['Status'].setValue(this.refillform.status);

      console.log(this.refillform.noOfBeds);

      console.log(this.updateForm.value.NoOfBeds);
     //this.updateForm.setValue(this.addRoomService.getIntermediate());

  
  }

  view(){

    this.mapaddress =this.updateForm.value.Area +" "+ this.updateForm.value.City;
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
    const mapAddress = this.updateForm.value.Area + "" + this.updateForm.value.City;
    this.addRoomService.getLocation(mapAddress).subscribe(locationData => {
      this.addRoomService.lat = locationData.lat();
      this.addRoomService.lng = locationData.lng();
      
    });
  }
  submit(updateForm:any)
  {
  
    if(this.updateForm.invalid)
    {
      return ;
    }
    this.setlatlng();
    console.log(updateForm.RoomId);
    
    var nativeElement:HTMLInputElement= this.fileInput.nativeElement;

    if(nativeElement.value=='')
    {
      this.addRoomService.updateDetails(updateForm.RoomId,this.updateForm.value).subscribe(
        data=>{
          if(data.code==1)
          {
            this.toastr.success("Room Details are Updated");
            this.dialogRef.close();
            this.addRoomService.addRoomSubscriber();

          }
          else if(data.code==0||data.code==2)
          {
            this.toastr.error("failed to update details");
            this.dialogRef.close();
          }
        });
    }    
      
    else
    {
        if(!this.validateFile(nativeElement.files[0].name))
        {
          this.toastr.error(" Only Png or Jpeg formats are supported");
        }
        else
        {       
                this.addRoomService.updateDetails(updateForm.RoomId,this.updateForm.value).subscribe(

                  data=>{
                    if(data.code==1)
                    {

                      this.addRoomService.updateImage(updateForm.RoomId,nativeElement.files[0]).subscribe((res:any)=>{
                   
                           if(res.code==1)
                           {
                             this.toastr.success("Room Details are updated");
                             this.dialogRef.close();
                             this.addRoomService.addRoomSubscriber();
                             //this.router.navigate(['/partner/partnerhome/'])
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