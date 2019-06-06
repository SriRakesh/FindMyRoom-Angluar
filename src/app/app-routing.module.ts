import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { DataService } from './Shared/SharedServices/data.service';
import { AuthguardGuard } from './authguard.guard';


const routes: Routes = [

  // { path:'',redirectTo:'/features/booking/search',pathMatch:'full' },
  { path:'features', loadChildren:'./features/features.module#FeaturesModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash : true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
