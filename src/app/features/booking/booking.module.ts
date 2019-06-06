import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { BookingRoutingModule } from './booking-routing.module';
import { SearchComponent } from './search/search.component';
import { DisplaySearchComponent } from './display-search/display-search.component';
import { MatOptionModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule,FormsModule }from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule} from '@angular/material/icon';
import { MatSelectModule }from '@angular/material/select';
import { MatChipsModule} from '@angular/material/chips';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule} from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDividerModule} from '@angular/material/divider';
import { RoomFilter}from './../../Shared/Shared Pipes/RoomFilter.pipe'; 
import { BedFilter }from './../../Shared/Shared Pipes/BedFilter.pipe'; 
import { FurnitureFilter }from './../../Shared/Shared Pipes/FurnitureFilter.pipe';
import { AreaFilter }from './../../Shared/Shared Pipes/AreaFilter.pipe';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatTabsModule} from '@angular/material/tabs';
import { MatExpansionModule} from '@angular/material/expansion';
import { WishlistComponent } from './wishlist/wishlist.component';
import {MatRippleModule} from '@angular/material/core';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatGridListModule} from '@angular/material/grid-list';
//import { FooterComponent } from 'src/app/Core/footer/footer.component';


@NgModule({
  declarations: [
    SearchComponent, 
    DisplaySearchComponent,
    AreaFilter,
    FurnitureFilter,
    RoomFilter,
    BedFilter, 
   // FooterComponent,
    WishlistComponent, BookingConfirmationComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MatRippleModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatSliderModule,
    MatDividerModule,
    FormsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,
    MatRadioModule,
    MatGridListModule
  ]
})
export class BookingModule { }
