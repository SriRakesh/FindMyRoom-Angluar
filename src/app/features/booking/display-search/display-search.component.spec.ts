import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DisplaySearchComponent } from './display-search.component';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule} from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { MatTooltipModule, MatExpansionModule, MatSidenavModule, MatAutocompleteModule, MatChipsModule, MatIconModule, MatGridListModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatFormFieldControl, MatOptionModule } from '@angular/material';
import { AreaFilter }from './../../../Shared/Shared Pipes/AreaFilter.pipe';
import { BedFilter }from './../../../Shared/Shared Pipes/BedFilter.pipe';
import { FurnitureFilter }from './../../../Shared/Shared Pipes/FurnitureFilter.pipe';
import { RoomFilter }from './../../../Shared/Shared Pipes/RoomFilter.pipe';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

export class areafilter{
  transform() {
    return 'area';
   }
} 
export class bedfilter{
  transform() {
    return '2';
   }
}
export class furnfilter
{
  transform() {
    return 'yes';
   }
}
export class roomfilter{
  transform() {
    return '10000';
   }
}

export class Tost{
  warning(){}
  error(){}sssssssssss
}

xdescribe('DisplaySearchComponent', () => {
  let component: DisplaySearchComponent;
  let fixture: ComponentFixture<DisplaySearchComponent>;

 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DisplaySearchComponent,
        AreaFilter,
        FurnitureFilter,
        RoomFilter,
        BedFilter, 
        MatFormFieldControl,
       ],
      imports:[
        MatSelectModule,
        MatTooltipModule,
        HttpClientModule,
        MatSidenavModule,
        MatChipsModule,
        MatIconModule,
        AgmCoreModule,
        MatGridListModule,
        MatCardModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatAutocompleteModule,
        FurnitureFilter
      ], 
      providers : [{useClass:Tost, provide:ToastrService},MapsAPILoader,
        {provide: AreaFilter, useClass: areafilter},
        {provide: BedFilter, useClass: bedfilter},
        {provide: FurnitureFilter, useClass: furnfilter},
        {provide: RoomFilter, useClass: roomfilter}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
