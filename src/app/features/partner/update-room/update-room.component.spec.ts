import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UpdateRoomComponent } from './update-room.component';
import { MatFormFieldModule,MatDialogModule, MatInputModule,MatOptionModule ,MatSelectModule} from '@angular/material';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
// import { AddRoomServiceService } from 'src/app/Shared/SharedServices/add-room-service.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MapsAPILoader} from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GooglemapComponent } from '../../googlemap/googlemap.component';
import {} from 'googlemaps';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { RouterTestingModule} from '@angular/router/testing';
import { ToastrModule,ToastrService}  from 'ngx-toastr';


export class ToastMockService{
  warning(){}
  error(){}
  success(){}
}






export class MockMapsAPILoader {
  public load(): Promise<boolean> {
    return new Promise(() => {
      return true;
    });
  }
}




fdescribe('UpdateRoomComponent', () => {
  let component: UpdateRoomComponent;
  let fixture: ComponentFixture<UpdateRoomComponent>;
  // let roomService:AddRoomServiceService;
  let updateForm:FormGroup;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRoomComponent ],
      imports:[MatToolbarModule,ReactiveFormsModule,MatFormFieldModule,MatOptionModule,MatDialogModule,MatSelectModule,HttpClientModule,AgmCoreModule,
        ToastrModule.forRoot(),RouterTestingModule,ToastrModule],
        providers:[MapsAPILoader,{provide:MatDialogRef},{provide:MAT_DIALOG_DATA,useValue:[],ToastMockService},
        {useClass:Map,provide:GooglemapComponent}
      ],
        schemas:[
          NO_ERRORS_SCHEMA
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
     expect(component).toBeTruthy();
   });
  it('executing ngOnInit',()=>{
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy;
  })
   it('form invalid when Empty',()=>{
     
     expect(component.updateForm.valid).toBeTruthy;
   })

   
   it('updating update form',()=>{
    component.updateForm.patchValue({
      NoOfBeds:'2',
      City:'Banglore',
      Area:'Basavangudi Area',
      Address:'Kr Road',
      Furniture:'yes',
      Description:'Good Environment',
      Pincode:123456,
      RoomType:'Flat',
      Status:'available'
    })
      component.submit(updateForm),
      expect(component.submit).toBeTruthy();

      
   });

   it('closing dialog after submitting form',()=>{
     let spy=spyOn(component.dialogRef,'close').and.callThrough();
     component.submit(updateForm);
   })

   it('validating html input type',()=>{
     expect(component.fileInput.nativeElement).toBeTruthy();
   })
   it('validating image format',()=>{
     expect(component.validateFile).toEqual(true);
   })


});
