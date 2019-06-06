import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import{DataService}from '../app/Shared/SharedServices/data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate{
  constructor(public auth: DataService, private router: Router) { }
  canActivate():boolean{
    if(localStorage.getItem('userType')=='Admin')
    {
      return true;
    }
    else if(localStorage.getItem('userType')=='Partner')
    {
      return true;
    }
    else
    {
      this.router.navigate(['/features/booking/search']);
      return false;
    }
    //return this.auth.IsLoggedIn;n
  }
}

// const logged=this.auth.IsLoggedIn();
// if(logged)
// {
//   return true;
// }
// else{
//   this.router.navigate(['/features/booking/search'])