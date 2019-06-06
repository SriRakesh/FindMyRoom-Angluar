import { Component, OnInit,Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import { DataService} from './../../Shared/SharedServices/data.service';
import { ForgetpasswordComponent } from 'src/app/Shared/SharedComponent/forgetpassword/forgetpassword.component';
import { GoogleLoginProvider, FacebookLoginProvider,AuthService, LinkedinLoginProvider } from 'ng-dynami-social-login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  usertype: string;
  id: string;
  providerid: string;
  provider: string;


  constructor(private router: Router,public dialog: MatDialog,private toastr:ToastrService,public dialogRef:MatDialogRef<UserLoginComponent>,@Inject(MAT_DIALOG_DATA)public data:any,
  private builder:FormBuilder,private dataservice:DataService,private socialAuthService: AuthService ) { }
  
  isUserLogin :boolean;
  UserEmail: string;
  UserPassword: string;
  hide:boolean;
  fbmail:string;
  fbName:string;

  Login:FormGroup;
  ngOnInit() {
    this.Login=this.builder.group({
      UserEmail:['',(Validators.required,Validators.email)],
      UserPassword:['',Validators.required]
     });
    this.hide=true;
  }
  get f()
  {
    return this.Login.controls;
  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
   
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData);
        localStorage.setItem('userEmail',userData.email);
        localStorage.setItem('userName',userData.name);
        localStorage.setItem('providerId',userData.id);
        localStorage.setItem('provider',userData.provider);
        //this.dataservice.isUserLogin = true;
        //this.dataservice.userFbLoginSubscriber();
        this.fbmail=localStorage.getItem('userEmail');
        this.fbName=localStorage.getItem('userName');
        this.usertype=localStorage.getItem('userType');
        this.providerid=localStorage.getItem('providerId');
        this.provider=localStorage.getItem('provider');

        this.dataservice.fbUser(this.fbmail,this.fbName,this.usertype,this.providerid,this.provider).subscribe(data=>{
          console.log(data);
          if(data.code==1)
          {
          localStorage.setItem('userId',data.set[0].userId);
          localStorage.setItem('userType',data.set[0].userType);
          console.log(localStorage.getItem('userId'));
          this.dataservice.isUserLogin = true;
          this.dataservice.userFbLoginSubscriber();
          if(data.set[0].userType=='Partner')
          {
            this.router.navigate(['/features/partner/partnerhome']);
            Swal.fire({
              title: 'Please Update Your Profile',
              animation: false,
              customClass: {
                popup: ''
              }
            })
          }
          else{
            this.router.navigate(['/features/booking/search']);
            Swal.fire({
              title: 'Please Update Your Profile',
              animation: false,
              customClass: {
                popup: ''
              }
            })
          }
          this.toastr.success(data.message);
          }
          else if (data.code==2)
          {
            this.toastr.error(data.message);
          }
        })
      }
    ); 
    
    this.dialogRef.close();
  }
  async role(){
    const {value: Role} = await Swal.fire({
      title: 'Select User',
      input: 'select',
      inputOptions: {
        'Renter': 'Renter',
        'Partner': 'Partner'
        
      },
      inputPlaceholder: 'Select a Role',
      showCancelButton: true,
      inputValidator: (value) => {
        this.usertype=value;
       localStorage.setItem('userType',this.usertype);
       console.log(this.usertype);
        return new Promise((resolve) => {
          // if (value === 'Partner') {
          //   resolve()
          // } else {
          //   resolve()
          // }
          resolve();
        })
      }
    })
    
    if (Role) {
      this.socialSignIn('facebook');
    }
  }

  login() {
    this.dataservice.userAuthenticate(this.Login.value.UserEmail,this.Login.value.UserPassword).subscribe(data=>{
      if(data.code == 1)
      {
        localStorage.setItem('userType',data.set[0].userType);
        localStorage.setItem('userName',data.set[0].userName);
        localStorage.setItem('userId',data.set[0].userId);
        //this.dataservice.SetLoggedIn(true);  
        this.dataservice.isUserLogin = true;
        this.dataservice.userLoginSubscriber();
        if(data.set[0].userType=="Renter")
        {
          this.router.navigate(['/features/booking/search']);
        }
        else if(data.set[0].userType=="Partner")
        {
          this.router.navigate(['/features/partner/partnerhome']);
        } 
        
        else{
          this.router.navigate(['/features/admin/adminhome']);
        }
        this.toastr.success(data.message);
    
       }
      else if(data.code == 0 || data.code == 2)
      {
        this.toastr.error(data.message);
      }
      //this.dialogRef.close();
    });
    this.dialogRef.close();
  }
  

  
  closeLoginDialog():void{

    this.dialogRef.close();

    const dialogRef = this.dialog.open(ForgetpasswordComponent, {
      
    }); 
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
