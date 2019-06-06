import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCustomerOfPartners } from '../SharedClasses/GetCustomerOfPartners';

@Injectable({
  providedIn: 'root'
})
export class PartnercustomerService {
id:string=null;
 private roomurl:string='https://findmyroomwebapp.azurewebsites.net/api/Rooms';
 // private roomurl:string='http://localhost:52687/api/rooms';
 //private roomurl:string='https://findmyroomwebapp-qa.azurewebsites.net/api/Rooms';

    headers: any;
    customerlist:GetCustomerOfPartners[];
    constructor(private http:HttpClient) {
      this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
     }
     public getAllCustomer(id:number):Observable<any>{
      return this.http.get<any>(this.roomurl+'/PartnerCustomer/'+id, {headers: this.headers});
    }
  }