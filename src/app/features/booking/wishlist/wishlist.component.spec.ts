import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistComponent } from './wishlist.component';
import { MatInputModule, MatAutocompleteModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatCardModule } from '@angular/material';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { componentFactoryName } from '@angular/compiler';



fdescribe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistComponent ],
      imports:[ 
        MatInputModule,
        ToastrModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatAutocompleteModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatCardModule
       ],
      providers:[{provide:ToastrService}]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('executing ngOnInit',()=>{
   
    component.userLoginId="1";
    component.userType="Renter";
    component.loginStatus=true;
    component.RenterId=1;
    component.userName="rahul";
    component.showWishList=true;
   
    component.ngOnInit();
  
    expect(component).toBeTruthy();
    
  });

  
  it('ngInit method that will return wishlisted flats', () => {
    component.wishListedRooms=[];
    expect(component).toBeTruthy();
  });


  
  it('removeFromWishList method',()=>{

    component.userLoginId="1";
    component.userType="Renter";
    component.loginStatus=true;
    component.RenterId=1;
    component.userName="rahul";
    component.showWishList=true;


    component.userLoginId="1";
    component.userType="Renter";
 
   component.wishList.RoomId=2;
   component.wishList.RenterId=2;
    component.removeFromWishList(2);
    // component.wishListRemoved[0].WishListId=1;
    // component.wishListRemoved[0].RoomId=2;
    // component.wishListRemoved[0].RenterId=2;

    component.message="please login as a 'Renter' to view your wishlist";

    expect(component.wishListedRooms).toEqual([]);
  });


});
