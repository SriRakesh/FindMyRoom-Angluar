import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerhomeComponent } from './partnerhome/partnerhome.component';
import { DisplaycustomerComponent } from './displaycustomer/displaycustomer.component';
import { MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatCardModule, MatMenuModule, MatIconModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, MatRadioModule, MatFormField } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoomComponent } from './add-room/add-room.component';
import { ViewPropertiesComponent } from './view-properties/view-properties.component';
//import { UpdatePartnerComponent } from './../../Shared/SharedComponent/update-partner/update-partner.component';

@NgModule({
  declarations: [PartnerhomeComponent,DisplaycustomerComponent, AddRoomComponent, ViewPropertiesComponent],
  imports: [
    CommonModule,
    PartnerRoutingModule,
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
    MatCheckboxModule, 
    MatDialogModule,
    MatToolbarModule,
    MatRadioModule,
    
    
  ],
  entryComponents:[
    AddRoomComponent
  ]
  
})
export class PartnerModule { }
