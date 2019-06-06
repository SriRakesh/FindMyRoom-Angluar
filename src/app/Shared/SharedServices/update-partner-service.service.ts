import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { partner } from '../SharedClasses/partner';

@Injectable({
  providedIn: 'root'
})
export class UpdatePartnerServiceService {
  partners:partner;
  PartnerId:number;
  catchPartner=new Subject<boolean>();
  //deleteForm:any;
  dialogCloseEvent = new Subject<boolean>();
  private headers: HttpHeaders;
  private accessPointUrl: string = 'https://findmyroomwebapp.azurewebsites.net/api/Admin';
// private accessPointUrl: string = 'http://localhost:52687/api/Admin';
//private accessPointUrl: string = 'https://findmyroomwebapp-qa.azurewebsites.net/api/Admin';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }
  public getPartners():Observable<any>{
    return this.http.get<any>(this.accessPointUrl+'/ShowPartners', {headers: this.headers});
  }
  public setData(partner1:partner)
  {
    this.partners=partner1;
  }
  public getData()
  {
    return this.partners;
  }
  public getUserData():Observable<any>{
    return this.http.get<any>(this.accessPointUrl+'/GetUserDetails', {headers: this.headers});
  }
  public postData(PartnerId,payload): Observable<any>
  {
   const requestURL = this.accessPointUrl + '/UpdatePartner/' + PartnerId;
    return this.http.put(requestURL,payload,{headers:this.headers});
  }
  dialogCloseCatcher()
  {
    this.dialogCloseEvent.next(true);
  }
  public deletePartner(PartnerId):Observable<any>
  {
    //debugger
    const requestURL=this.accessPointUrl + '/DeletePartner/'+PartnerId;
    return this.http.delete<any>(requestURL,{headers:this.headers});
  }
  partnerSubscriber(){
    this.catchPartner.next(true);
  }

}
