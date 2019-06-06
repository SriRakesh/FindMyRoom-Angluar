export class flats{
    public PartnerId:number;
     public RoomId:number;
     public cost:number;
     public NoOfBeds:string;
     public City:string;
     public Area:string;
     public Address:string;
     public Furniture:string;
     public Description:string;
     public Pincode:number;
     public Status:string="available";
   
   }
   export class Addroom
    {
    public PartnerId:number;
    public RoomId:number;
    public RoomCost:number;
    public NumberOfRooms:string;
    public City:string;
    public Area:string;
    public Address:string;
    public Furniture:string;
    public Description:string;
    public Pincode:number;
    public Status:string="available";
    public RoomType:string;
    public Latitude:string;
    public Longitude :string;
}

   export class Room{
    public roomId:number=0;
    public cost:number=0;
    public noOfBeds:number=0; // main program  it is integer.
    public city:string='';
    public area:string='';
    public roomType:string='';
    public furniture:string='';
    public description:string='';
    public pincode:number=0;
}

export class UpdateRoom{
    public RoomId:number;
    public Cost:number;
 
    public NoOfBeds:number;
   
    public City :string;
    public Area :string;
 
    public Address:string;
    public  Pincode:number;

    public Furniture :string;
    public Description:string;
 
    public Status:string;
    public RoomType :string;
    public Latitude:string;
    public Longitude:string;
}

export class Search{
    city:string; roomType:string;
}

// export class filter{
//     roomId:number=null;
//     cost:number=null
//     noOfBeds:string='';
//     city:string='';
//     area:string='';
//     roomType:string='';
//     Furniture:string='';
// }

export class CurrentBookingRoom{
    public room:Room=new Room;
    public renterId:number=0;
}

// export class Room{
//     public roomId:number=0;
//     public cost:number=0;
//     public noOfBeds:number=0; // main program  it is integer.
//     public city:string='';
//     public area:string='';
//     public roomType:string='';
//     public furniture:string='';
//     public description:string='';
//     public pincode:number=0;
// }