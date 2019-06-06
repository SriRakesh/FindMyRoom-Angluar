import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Core/header/header.component';
import { AddRoomServiceService } from './Shared/SharedServices/add-room-service.service';
import { HttpClientModule } from '@angular/common/http';
import { SignupServiceService } from './Shared/SharedServices/signup-service.service';
import { SearchService } from './../app/Shared/SharedServices/search.service';
import { ToastrModule}  from 'ngx-toastr';
import { FeaturesModule } from './features/features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule,MatTooltipModule, MatProgressSpinnerModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDialogRef, MAT_DIALOG_DATA, MatIcon, MatIconModule } from '@angular/material';
import { UserLoginComponent } from './Core/user-login/user-login.component';
import { RoomtypePipe } from './Shared/Shared Pipes/roomtype.pipe';
import { AuthguardGuard } from './authguard.guard';
import { DynamiSocialLoginModule, AuthServiceConfig, GoogleLoginProvider,FacebookLoginProvider, LinkedinLoginProvider, AuthService } from 'ng-dynami-social-login';
import { FooterComponent } from './Core/footer/footer.component';
import { ImagedisplayComponent } from './Shared/SharedComponent/imagedisplay/imagedisplay.component';
import { ProfileupdateComponent } from './Shared/SharedComponent/profileupdate/profileupdate.component';
import {MatChipsModule} from '@angular/material/chips';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { UpdatepasswordComponent } from './Shared/SharedComponent/updatepassword/updatepassword.component';
import { NgHttpLoaderModule } from 'ng-http-loader';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
         {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2005795433061078")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          // provider: new GoogleLoginProvider("XXXxXXXX.apps.googleusercontent.com")
          provider: new GoogleLoginProvider("807944689268-rlr8hhahel9s8udpejnd27hmdc4vqla1.apps.googleusercontent.com")
        }
       
      ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserLoginComponent,
    RoomtypePipe,
    FooterComponent,
    ImagedisplayComponent,
    // ProfileComponent
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeaturesModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    AgmCoreModule,
    MatIconModule,
    DynamiSocialLoginModule,
    MatChipsModule,
    HttpClientModule,
    // AgmCoreModule.forRoot({
    //   apiKey : 'AIzaSyAnyyxcbD5cSeiJv2b0_8jxGkjr85m-6IY',
    //   libraries: ['places']
    // }),
    NgHttpLoaderModule.forRoot(), 
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:"toast-top-right",
      preventDuplicates:false,
    })
  ],
  entryComponents:[UserLoginComponent,ImagedisplayComponent],
  providers: [AddRoomServiceService,SignupServiceService,AuthguardGuard,SearchService,{ provide: MatDialogRef },
    { provide: MAT_DIALOG_DATA, useValue: [] },{
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs}], 
      // exports:[ FooterComponent ],
  bootstrap: [AppComponent]
})

export class AppModule { }



