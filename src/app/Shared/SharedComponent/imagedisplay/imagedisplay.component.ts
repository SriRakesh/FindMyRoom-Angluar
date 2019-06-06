import { Component, OnInit, Inject } from '@angular/core';
import { AddRoomServiceService } from '../../SharedServices/add-room-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-imagedisplay',
  templateUrl: './imagedisplay.component.html',
  styleUrls: ['./imagedisplay.component.css']
})
export class ImagedisplayComponent implements OnInit {

  photos:any[];
  
  
  constructor(private roomservice:AddRoomServiceService,
              private dialogRef:MatDialogRef<ImagedisplayComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {

    this.roomservice.getPhotos(this.data.selectedItem).subscribe( photos => this.photos = photos as any[]);

    
  }


  

}
