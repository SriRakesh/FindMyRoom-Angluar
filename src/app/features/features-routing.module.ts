import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../Shared/SharedComponent/signup/signup.component';
import { ForgetpasswordComponent } from '../Shared/SharedComponent/forgetpassword/forgetpassword.component';
import { AuthguardGuard } from '../authguard.guard';
import { AddpartnerComponent } from './admin/addpartner/addpartner.component';
import{DataService} from '../Shared/SharedServices/data.service';
import { BookingConfirmationComponent } from './booking/booking-confirmation/booking-confirmation.component';
import { FooterComponent } from '../Core/footer/footer.component';
import { ProfileComponent } from '../Shared/SharedComponent/profile/profile.component';
import { ProfileupdateComponent } from '../Shared/SharedComponent/profileupdate/profileupdate.component';
import { UpdatepasswordComponent } from '../Shared/SharedComponent/updatepassword/updatepassword.component';

const routes: Routes = [

   { path:'booking',loadChildren:'./../features/booking/booking.module#BookingModule' },
   { path:'partner',loadChildren:'./partner/partner.module#PartnerModule',canActivate:[AuthguardGuard]},
   { path:'admin',loadChildren:'./admin/admin.module#AdminModule',canActivate:[AuthguardGuard]}, 
   { path:'signup', component:SignupComponent},  
   { path:'forgetpassword',component:ForgetpasswordComponent},
   {path:'profile',component:ProfileComponent},
   {path:'profileupdate',component:ProfileupdateComponent},
   {path:'updatepassword',component:UpdatepasswordComponent},
   { path:'**',redirectTo:'/features/booking/search',pathMatch:'full' },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[DataService,AuthguardGuard]
})

export class FeaturesRoutingModule { }

