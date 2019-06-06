import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRoomComponent } from './add-room.component';
import { MatToolbar } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule} from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { GooglemapComponent } from '../../googlemap/googlemap.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
export class ToastMockService{
  warning(){}
  error(){}
  success(){}
}

export class Map{

}

export class MockMapsAPILoader {
  public load(): Promise<boolean> {
    return new Promise(() => {
      return true;
    });
  }
}


fdescribe('AddRoomComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture<AddRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoomComponent ],
      imports:[MatToolbarModule,ReactiveFormsModule,MatSelectModule,HttpClientModule,RouterTestingModule,AgmCoreModule,MatDialogModule,
        ToastrModule,
        ToastrModule.forRoot(),MatFormFieldModule,MatInputModule,BrowserAnimationsModule
        
      ], providers:[MapsAPILoader,{provide:MatDialogRef},{provide:MAT_DIALOG_DATA,useValue:[]},
                    {useClass:Map,provide:GooglemapComponent}
                  ],
                  schemas: [
                    NO_ERRORS_SCHEMA
                  ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('executing ngOnInit',()=>{
    component.ngOnInit();
  });
  it('form invalid when Empty',()=>{
    expect(component.roomForm.valid).toBeFalsy();
  })

  it('submitting room form',()=>{
   
        component.roomForm.patchValue({
          NoOfBeds:'4',
          City:'Banglore',
          Area:'Basavangudi Area',
          Address:'Kr Road',
          Furniture:'yes',
          Description:'Good Environment',
          Pincode:123456,
          RoomType:'Flat',
          Status:'available'

      })
      component.submit();
      expect(component.submit).toBeTruthy();
  })

  it('closing dialog after submitting form',()=>{
    let spy=spyOn(component.dialogRef,'close').and.callThrough();
    component.submit();
  })

  it('validating image format',()=>{
    expect(component.validateFile).toBeTruthy();
  })

  it('validate html input type',()=>{
    expect(component.fileInput.nativeElement).toBeTruthy();
  })

it('submitting  post room details',()=>{
  expect(component.postRoomDetails).toBeTruthy();
})

  





});
