import { Pipe,PipeTransform } from '@angular/core';
import { Room } from '../SharedClasses/room';

@Pipe({
    name: 'areafilter'
})

export class AreaFilter implements PipeTransform{

    transform(rooms:Room[],area:string){
        if(!rooms || !area)
        {
        return rooms;
        }
        else{
            return rooms.filter(r => (r.area.toLowerCase().indexOf(area.toLowerCase())!==-1));
        }
    }
}