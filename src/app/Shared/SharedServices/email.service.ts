import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private header:HttpHeaders;
 // private url:string="http://localhost:52687/api/User/SendEmail";
  private url:string="https://findmyroomwebapp.azurewebsites.net/api/User/SendEmail";
  //private url:string="https://findmyroomwebapp-qa.azurewebsites.net/api/User/SendEmail";
 // private url1:string="http://localhost:52687//api/User/UpdatePassword";
  private url1:string="https://findmyroomwebapp.azurewebsites.net/api/User/UpdatePassword";
  //public url1:string="https://findmyroomwebapp-qa.azurewebsites.net/api/User/UpdatePassword";
  constructor(private http:HttpClient) { 
    this.header=new HttpHeaders({'Content-Type':'application/json,charset=utf-8'});
  }
  post(email):Observable<any>{
    return this.http.get<any>(this.url + '/' + email);
  }
  update(email,password):Observable<any>{
    return this.http.get<any>(this.url1 + '/' + email+'/'+password);
  }
}
