import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AttendanceComponent } from '../attendance/attendance.component';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})

export class BookingHistoryComponent {
  constructor(public authService:AuthService,private route:Router, public attendance: AttendanceComponent){}
  

  
}
