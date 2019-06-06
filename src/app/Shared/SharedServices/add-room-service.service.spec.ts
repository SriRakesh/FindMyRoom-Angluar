import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AddRoomServiceService } from './add-room-service.service';

describe('AddRoomServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports:[HttpClientModule],


  }));

  it('should be created', () => {
    const service: AddRoomServiceService = TestBed.get(AddRoomServiceService);
    expect(service).toBeTruthy();
  });
});
