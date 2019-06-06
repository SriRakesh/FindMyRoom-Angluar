import { Pipe,PipeTransform } from '@angular/core';
import { Room } from '../SharedClasses/room';

@Pipe({
    name: 'costfilter'
})

export class RoomFilter implements PipeTransform{

    transform(rooms:Room[],price:number){
        if(!rooms || !price)
        {
        return rooms;
        }
        else if(price == 1)
        {
            return  rooms.filter(r =>(r.cost<=10000));
        }
        else if(price == 2)
        {
            return  rooms.filter(r => (r.cost>10000 && r.cost<=20000));               
        }
        else if(price == 3)
        {
            return rooms.filter(r =>(r.cost>20000 && r.cost<=30000));
        }
        else if(price == 4)
        {
            return rooms.filter(r =>(r.cost>30000 && r.cost<=40000));
        }
        else if(price == 5)
        {
            return rooms.filter(r =>(r.cost>40000 && r.cost<=50000));
        }
        else
        {
            return rooms;
        }
    }
}
