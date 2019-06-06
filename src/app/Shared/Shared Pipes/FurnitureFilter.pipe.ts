import { Pipe,PipeTransform } from '@angular/core';
import { Room } from '../SharedClasses/room';

@Pipe({
    name: 'furniturefilter'
})

export class FurnitureFilter implements PipeTransform{

    transform(rooms:Room[],furniture:string){
        if(!rooms || !furniture)
        {
        return rooms;
        }
        else{
            return rooms.filter(r => (r.furniture.toLowerCase() === furniture.toLowerCase()))
        }
    }
}