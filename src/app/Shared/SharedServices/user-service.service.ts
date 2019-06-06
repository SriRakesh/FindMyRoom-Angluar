import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { partner } from '../SharedClasses/partner';
import { userdetails } from '../SharedClasses/userdetails';
import { userupdate } from '../SharedClasses/userupdate';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private header:HttpHeaders;
  addCatcher=new Subject<boolean>();
  //dialogCloseEvent = new Subject<boolean>();
  private url:string="https://findmyroomwebapp.azurewebsites.net/api/User/";
  //private url:string="https://findmyroomwebapp-qa.azurewebsites.net/api/User/";
 // private url:string="http://localhost:52687/api/User/";
  user:userupdate = new userupdate();
  constructor(private http:HttpClient) { 
    this.header=new HttpHeaders({'Content-Type':'application/json,charset=utf-8'});
  }
  post(userId):Observable<any>{
    return this.http.get<any>(this.url + 'UserDetails/' + userId);
  }
  public setData(users){
    console.log(users);
    this.user.userId=users.userId;
    this.user.userName=users.userName;
    this.user.userPhoneNumber=users.userPhoneNumber;
    this.user.userAddress=users.userAddress;
  }
  public getData()
  {
    return this.user;
  }
  update(user):Observable<any>{
    return this.http.put<any>(this.url + 'UpdateUser',user);
  }
  // dialogCloseCatcher()
  // {
  //   this.dialogCloseEvent.next(true);
  // }
  addRoomSubscriber(){
    this.addCatcher.next(true);
  }
}
