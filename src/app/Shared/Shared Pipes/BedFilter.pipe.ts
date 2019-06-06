import { Pipe,PipeTransform } from '@angular/core';
import { Room } from '../SharedClasses/room';

@Pipe({
    name: 'bedfilter'
})

export class BedFilter implements PipeTransform{

    transform(rooms:Room[],beds:number){
        if(!rooms || !beds)
        {
        return rooms;
        }
        else{
            return rooms.filter(r => (r.noOfBeds == beds))
        }
    }
}