import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
import {AddRoomServiceService} from '../../Shared/SharedServices/add-room-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {} from 'googlemaps';
import { GoogleMapsAPIWrapper, MapsAPILoader, AgmCoreModule } from '@agm/core';
import { SearchService } from 'src/app/Shared/SharedServices/search.service';
import { Location } from '../../Shared/SharedClasses/signup';
import { GooglemapComponent } from './googlemap.component';
//import { get } from 'http';


const dialogMock = {
  close: () => { }
 };
fdescribe('GooglemapComponent', () => {
  let component: GooglemapComponent;
  let fixture: ComponentFixture<GooglemapComponent>;
  let addroomservice:AddRoomServiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglemapComponent ],
      imports:[ AgmCoreModule,{ provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: dialogMock },AddRoomServiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it("executing ngAfterViewInit()",()=>{
  //   let RoomId=1;
  //   let lat="18.76543";
  //   let lng="15.876543";
  //   component.ngAfterViewInit();
  //   expect(component.ngAfterViewInit).toBeTruthy();
  //   let Address="siddipet";
  //   spyOn(addroomservice,'getLocation').and.returnValues(lat,lng);
  // })
});
