import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplaycustomerComponent } from './displaycustomer/displaycustomer.component';
import { PartnerhomeComponent } from './partnerhome/partnerhome.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';

const routes: Routes = [
  { path:'',redirectTo:'features/partner/partnerhome/',pathMatch:'full' },
  { path:'partnerhome',component:PartnerhomeComponent },
  { path:'displaycustomer',component:DisplaycustomerComponent },
  { path:'viewproperties',component:ViewPropertiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
