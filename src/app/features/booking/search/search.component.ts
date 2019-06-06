import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/Shared/SharedServices/search.service';
import { ToastrService } from 'ngx-toastr';
import { Search } from 'src/app/Shared/SharedClasses/room';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router,private service:SearchService,private toastr:ToastrService) { }
  
  
  Cities:string[]=[];
  searched:Search = new Search();
  
  search = new FormGroup({
    city: new FormControl(null, Validators.required),
    roomType: new FormControl('',Validators.required),
  });

  ngOnInit() {
    localStorage.setItem('city','');
    localStorage.setItem('roomType','');
    
    this.service.getCity()
    .subscribe(data => {
      if(data.code == 1)
      {
        this.Cities = data.set as string[]; 
      }
      else if(data.code==0){
        this.toastr.warning("🙁No Cities Found!!");
      }
      else{
        this.toastr.error(""+data.message);
        }
    });
  }

  onsubmit(){
    localStorage.setItem('city',this.search.value.city);
    localStorage.setItem('roomType',this.search.value.roomType);    
    this.searched.city = localStorage.getItem('city');
    this.searched.roomType = localStorage.getItem('roomType');
    this.service.getSearchedRooms(this.searched);     
  }

}
