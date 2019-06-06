import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplaypartnerComponent }from '../admin/displaypartner/displaypartner.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import { MatButtonModule,MatMenuModule,MatCardModule,MatIconModule,MatRadioModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddpartnerComponent } from './addpartner/addpartner.component';
import { UpdatePartnerComponent } from './update-partner/update-partner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletepartnerComponent } from './deletepartner/deletepartner.component';
import { GetuserdetailsComponent } from './getuserdetails/getuserdetails.component';
@NgModule({
  declarations: [AdminhomepageComponent,DisplaypartnerComponent,AddpartnerComponent,UpdatePartnerComponent, DeletepartnerComponent, GetuserdetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule, 
    MatDialogModule,
    MatToolbarModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  entryComponents:[UpdatePartnerComponent,AddpartnerComponent]
})

export class AdminModule { }
