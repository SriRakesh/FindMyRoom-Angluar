import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { DisplaySearchComponent } from './display-search/display-search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';

const routes: Routes = [
  // { path:'',redirectTo:'/features/booking/search',pathMatch:'full' },
  { path:'search',component:SearchComponent },
  { path:'display',component:DisplaySearchComponent },
  {  path:'wishlist',component:WishlistComponent},
  {path:'booking-confirmation',component:BookingConfirmationComponent}
  //{ path:'',redirectTo:'/features/booking/search',pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
