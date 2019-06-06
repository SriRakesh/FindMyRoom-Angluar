import { Pipe, PipeTransform } from '@angular/core';
import { GetCustomerOfPartners } from '../SharedClasses/GetCustomerOfPartners';

@Pipe({
  name: 'roomtype'
})
export class RoomtypePipe implements PipeTransform {

  transform(GetCustomer:GetCustomerOfPartners[], roomType: string) 
  {
    if(GetCustomer && roomType)
    {
      return GetCustomer.filter(GetCustomer => GetCustomer.RoomType==roomType);
    }
    else
    {
      return GetCustomer;
    }
  }
}
