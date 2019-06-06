import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material';
 import {UserLoginComponent} from './../user-login/user-login.component';
 import { DataService} from './../../Shared/SharedServices/data.service';
import { Router } from '@angular/router';
import { AddRoomServiceService } from 'src/app/Shared/SharedServices/add-room-service.service';
import { SignupComponent } from 'src/app/Shared/SharedComponent/signup/signup.component';
import { AuthService } from 'ng-dynami-social-login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  name:string=null;
  isUserLogin:boolean=false
  isLogin:boolean;
  loginsubscribe: any;
  usertype:string=null;
  isRenter:boolean;
  isPartner:boolean;
  isAdmin:boolean;
  isLoggedIn:boolean=false;
  
  constructor(public dialog: MatDialog,private addservice:AddRoomServiceService,private router:Router,
    private dataservice:DataService,private socialAuthService:AuthService) {
    }
 

  
  ngOnInit() {
    this.headerOptions();
    this.addservice.addRoomCatcher.subscribe(isLogin=>{
      if(isLogin)
      {
        this.isLogin=true;
        this.name=localStorage.getItem('userName');
        this.usertype = localStorage.getItem('userType'); 
        this.headerOptions();
      }
    });  
    this.dataservice.userLogInCatcher.subscribe(isloggedIn => {
      if(isloggedIn){
        this.name=localStorage.getItem('userName');
       this.usertype = localStorage.getItem('userType'); 
       this.headerOptions();
      }
    });
    this.dataservice.userLogOutCatcher.subscribe((isloggedIn:boolean) => {
      if(isloggedIn){
        this.isUserLogin=false;
         this.name=localStorage.getItem('userName');
        this.usertype = localStorage.getItem('userType'); 
       this.headerOptions();
      }
    });
    this.dataservice.fbLoginCatcher.subscribe(isloggedIn =>
      {
        if(isloggedIn)
        {
          this.name=localStorage.getItem('userName');
          this.usertype=localStorage.getItem('userType');
          this.headerOptions();
        }
      });
      // this.dataservice.fbLogOutCatcher.subscribe((isloggedIn : boolean) =>{
      //   if(isloggedIn)
      //   {
      //     this.isUserLogin=false;
      //    this.name=localStorage.getItem('userName');
      //   this.usertype = localStorage.getItem('userType'); 
      //  this.headerOptions();

      //   }
      // });
}
  headerOptions() {   
    if(localStorage.getItem('userType') && localStorage.getItem('userType') == "Renter" ){
      this.name = localStorage.getItem('userName');
      this.isRenter = true;
      this.isUserLogin = true;
    }
      
   else if(localStorage.getItem('userType') || localStorage.getItem('userType')){
    this.name = localStorage.getItem('userName');
    this.isRenter = false;
    this.isUserLogin = true;
  }
               
  if(localStorage.getItem('userType') && localStorage.getItem('userType') == "Partner"){
    this.name = localStorage.getItem('userName');
    this.isPartner = true;
    this.isUserLogin = true;
  }
     else if(localStorage.getItem('userType') || localStorage.getItem('userType')){
      this.name = localStorage.getItem('userName');
      this.isPartner = false;
      this.isUserLogin = true;
    }
    if(localStorage.getItem('userType') && localStorage.getItem('userType') == "Admin"){
      this.name = localStorage.getItem('userName');
      this.isAdmin = true;
      this.isUserLogin = true;
    }
       else if(localStorage.getItem('userType') || localStorage.getItem('userType')){
        this.name = localStorage.getItem('userName');
        this.isAdmin = false;
        this.isUserLogin = true;
      }
   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserLoginComponent, {
      
    }); 
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  onLogout()
  {
    this.socialAuthService.signOut();
    localStorage.setItem('userType',' ');
    localStorage.removeItem('userType');
    localStorage.clear();
    this.dataservice.userLogOutSubscriber();
     
    this.isUserLogin=false;
    this.isRenter=false;
    this.isPartner=false;
    this.isAdmin=false;
    
    this.router.navigate(['/features/booking/search']);

  }
  
  ngOnDestroy() {
    if(this.loginsubscribe) {
      this.loginsubscribe.unsubscribe();
    }
  }
  
  signUp(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      
    }); 
    dialogRef.afterClosed().subscribe(result => {
    });
 
}

bot(){
  Swal.fire({
    title: '<img src="./../../../assets/images/bot.gif" style="height:100px;width:100px;">',
    html:'<iframe id="chat" src=\'https://webchat.botframework.com/embed/FMR-Bot?s=f7OJz9tBVS8.4bOPUBpXni69Dj5UuwNpUBwOULx5qpfUhmSfvHbsfp4\'  style=\'background-color: white;float: right;min-width: 100px; width: 100%; min-height: 400px;\'></iframe>',
    showConfirmButton:false,
    showCloseButton: true,
  })
}

}
