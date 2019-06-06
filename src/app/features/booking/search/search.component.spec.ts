import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms'; 
import { SearchComponent } from './search.component';
import { MatInputModule,MatAutocompleteModule,MatSelectModule,MatFormFieldModule, MatIconModule, MatButtonModule} from '@angular/material';
import { RouterTestingModule} from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class Tost{
  warning(){}
  error(){}
}

fdescribe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports:[ 
        MatInputModule,
        ToastrModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatAutocompleteModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        
       ],
       
      providers:[{useClass:Tost, provide:ToastrService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngInit method that will return Cities', () => { 
   component.Cities = [];
    expect(component).toBeTruthy();
  });

  it('onsubmit method in the search',()=>{
    component.search.value.city = 'vijayawada';
    component.search.value.roomType = 'Flat';
    component.onsubmit();
    component.searched.city = 'vijayawada';
    component.searched.roomType = 'Flat';
    expect(component).toBeTruthy();
  });

  it('ngoninit method', ()=>
  {
    component.Cities = ['vijayawada'];
    component.ngOnInit();
    expect(component).toBeTruthy();
  })
});
