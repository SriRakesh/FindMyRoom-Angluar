import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { DisplaypartnerComponent } from 'src/app/Shared/SharedComponent/displaypartner/displaypartner.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import { DisplaypartnerComponent } from './displaypartner/displaypartner.component';
import { DeletepartnerComponent } from './deletepartner/deletepartner.component';
import { GetuserdetailsComponent } from './getuserdetails/getuserdetails.component';


const routes: Routes = [
  { path:'adminhome',component:AdminhomepageComponent},
  {path:'displaypartner',component:DisplaypartnerComponent},
  {path:'deletepartner',component:DeletepartnerComponent},
  {path:'getuserdetails',component:GetuserdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
