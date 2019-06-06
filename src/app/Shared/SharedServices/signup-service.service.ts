import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Signup} from '../SharedClasses/signup';



 @Injectable({
   providedIn: 'root'
})

export class SignupServiceService {

  private header:HttpHeaders;

   private url:string="https://findmyroomwebapp.azurewebsites.net/api/User";
  // private url:string="http://localhost:52687/api/User";
  //private url:string="https://findmyroomwebapp-qa.azurewebsites.net/api/User";
  constructor(private http:HttpClient) {
    this.header = new HttpHeaders({'Content-Type':'application/json,charset=utf-8'});
   }

 customer:Signup={
   Email:'',
   MobileNumber:'',
   Address:'',
   UserName:'',
   Password:'',
   Type :''
 };

  get():Observable<Signup[]>
  {
    return this.http.get<Signup[]>(this.url+"/GetUser",{headers: this.header});
  }

  post(payload): Observable<any>
  {
    //this.customer.Id=1;
    // this.customer.FullName=payload.FullName;
    this.customer.Email=payload.Email;
    this.customer.MobileNumber=payload.MobileNumber;
    this.customer.Address=payload.Address;
    this.customer.UserName=payload.FullName;
    this.customer.Password=payload.Password;
    this.customer.Type=payload.Type;
    return this.http.post<Signup>(this.url+"/PostUser",this.customer,{headers: this.header});
  }
}
