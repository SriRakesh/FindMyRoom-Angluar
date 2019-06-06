import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Authenticate} from '../../Core/user-login/Authenticate'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
//for User Login and logout button 
  isUserLogin:boolean;
  userLogInCatcher = new Subject<boolean>();
  userLogOutCatcher = new Subject<boolean>();
  fbLoginCatcher = new Subject<boolean>();
  fbLogOutCatcher= new Subject<boolean>();
  

  // private loggedInStatus=JSON.parse(localStorage.getItem('loggedInStatus')||'false');
  // SetLoggedIn(value:boolean){
  //   this.loggedInStatus=value;
  //   localStorage.setItem('loggedInStatus','true');
  // }
  // get IsLoggedIn()
  // {
  //   return JSON.parse(localStorage.getItem('loggedInStatus') || this.loggedInStatus.toString());
  // }
   public url = "https://findmyroomwebapp.azurewebsites.net/api";
  //public url="http://localhost:52687/api";
  //public url="https://findmyroomwebapp-qa.azurewebsites.net/api";
  header:HttpHeaders;
  name:string;
    public authenticate:Authenticate=new Authenticate();
    constructor(private http:HttpClient) {
    this.header=new HttpHeaders({'content-type':'application/json,charset=utf-8'});
   }
   userAuthenticate(UserEmail,UserPassword)
   {
     this.authenticate.UserEmail=UserEmail;
     this.authenticate.UserPassword=UserPassword;
     return this.http.post<any>(this.url + '/User/login',this.authenticate,{headers:this.header});
   }
   fbUser(fbMail,fbName,usertype,providerid,provider){
     this.authenticate.UserEmail=fbMail;
     this.authenticate.UserName=fbName;
     this.authenticate.UserType=usertype;
     this.authenticate.ProviderId=providerid;
     this.authenticate.Provider=provider;
     return this.http.post<any>(this.url + '/User/fblogin',this.authenticate,{headers:this.header});

   }
   userLoginSubscriber() {
     this.userLogInCatcher.next(true);
     this.userLogOutCatcher.next(false);
     //this.loggedInStatus;
   }


   userLogOutSubscriber() {
    this.userLogInCatcher.next(false);
    this.userLogOutCatcher.next(true);
    //this.loggedInStatus;
  }
  userFbLoginSubscriber(){
    this.fbLoginCatcher.next(true);
    this.fbLogOutCatcher.next(false);
  }
  userFbLogoutSubscriber(){
    this.fbLogOutCatcher.next(true);
    this.fbLoginCatcher.next(false);
  }
}
