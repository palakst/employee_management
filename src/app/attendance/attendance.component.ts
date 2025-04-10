import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})


export class AttendanceComponent implements OnInit {
  checkInTime: string | null = null;
  checkOutTime: string | null = null;
  status:string|null=null
  constructor(public authService:AuthService,private router: Router){}

  ngOnInit(): void {
    const today = this.getTodayKey();
    const data = JSON.parse(localStorage.getItem('attendance_' + today) || '{}');
    this.checkInTime = data.checkInTime || null;
    this.checkOutTime = data.checkOutTime || null;
  
    if (this.checkInTime && this.checkOutTime) {
      const inDate = new Date(`1970-01-01T${this.checkInTime}`);
      const outDate = new Date(`1970-01-01T${this.checkOutTime}`);
      const hoursWorked = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60);
  
      if (hoursWorked >= 9) {
        this.status = 'Overtime';
      } else if (hoursWorked >= 8) {
        this.status = 'Present';
      } else {
        this.status = 'Absent';
      }
    } else if (this.checkInTime && !this.checkOutTime) {
      this.status = 'In-Progress';
    } else {
      this.status = 'Absent';
    }
  }
  

  checkIn() {
    const now = new Date().toLocaleTimeString();
    this.checkInTime = now;
    this.saveAttendance('checkInTime', now);
    this.router.navigate(['/mark_attendance'])

  }

  checkOut() {
    const now = new Date().toLocaleTimeString();
    this.checkOutTime = now;
    this.saveAttendance('checkOutTime', now);
    this.router.navigate(['/mark_attendance'])

  }

  get checkedIn(): boolean {
    return !!this.checkInTime;
  }

  get checkedOut(): boolean {
    return !!this.checkOutTime;
  }

  private getTodayKey(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  private saveAttendance(key: string, time: string): void {
    const today = this.getTodayKey();
    let data = JSON.parse(localStorage.getItem('attendance_' + today) || '{}');
  
    data[key] = time;
  
    // Compute status only if both times exist
    if (key === 'checkOutTime' && data.checkInTime) {
      const inDate = new Date(`1970-01-01T${data.checkInTime}`);
      const outDate = new Date(`1970-01-01T${time}`);
      const hoursWorked = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60);
  
      if (hoursWorked >= 8) {
        data.status = 'Present';
      } else {
        data.status = 'Absent';
      }
    }
  
    localStorage.setItem('attendance_' + today, JSON.stringify(data));
  }
  
}

