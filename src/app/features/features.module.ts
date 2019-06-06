import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule} from '@angular/material/select';
import { SignupComponent } from './../Shared/SharedComponent/signup/signup.component';
import { MatButtonModule,MatMenuModule,MatCardModule,MatIconModule,MatRadioModule, MatFormFieldModule} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForgetpasswordComponent } from '../Shared/SharedComponent/forgetpassword/forgetpassword.component';
import { UpdateRoomComponent } from './partner/update-room/update-room.component';
import {AuthguardGuard} from '../authguard.guard';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { AgmCoreModule } from '@agm/core';
import { AddRoomServiceService } from '../Shared/SharedServices/add-room-service.service';

 import { ProfileComponent } from '../Shared/SharedComponent/profile/profile.component';
import { ProfileupdateComponent } from '../Shared/SharedComponent/profileupdate/profileupdate.component';
import { UpdatepasswordComponent } from '../Shared/SharedComponent/updatepassword/updatepassword.component';



@NgModule({
  declarations: [
    SignupComponent,
    ForgetpasswordComponent,
    UpdateRoomComponent,
    GooglemapComponent,
    
     ProfileComponent,
      ProfileupdateComponent,
    UpdatepasswordComponent,
    ],

  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyBIN52BPIlypK7H5-1zxcfHyIegeQoUurk',
      libraries: ['places']
    }),
    MatCheckboxModule, 
    MatDialogModule,
    MatToolbarModule,
    MatRadioModule,
    MatFormFieldModule,

 ],

 entryComponents:[
  UpdateRoomComponent,
  GooglemapComponent,ProfileComponent
  
 ],

  providers:[ AddRoomServiceService, AuthguardGuard,
  {provide : ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],

})

export class FeaturesModule { }
