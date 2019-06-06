export class User{
    
    public UserId : number;  //UserId-PrimaryKey in Database 
    
    public UserName : string;  //UserName for login 
    
    public  UserPassword : string ; //Password for login
    
    public  UserEmail :  string ;  //Email of User
    
    public  UserPhoneNumber :  string ;  //Phone Number of the User
    
    public UserAddress :  string  //Address of User
    
    public UserType : string ;  //UserType should be Renter or Partner or Admin
    
    public UserStatus: string ;

    public code:number;

    public message:string;

    
    }