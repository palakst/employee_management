import { Component, OnInit } from '@angular/core';
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
  status: string | null = null;
  hasSeatForToday: boolean = false;
  errorMessage: string = '';

  constructor(public authService: AuthService, private router: Router) {}
  private hasSeatBookingForToday(): boolean {
    const username = this.authService.getCurrentUser()?.username;
    const today = new Date().toISOString().split('T')[0];
    const bookingKey = 'seatBookings_' + today;
    const bookings = JSON.parse(localStorage.getItem(bookingKey) || '[]');
  
    return bookings.some((b: any) => b.username === username);
  }
  
  ngOnInit(): void {
    const today = this.getTodayKey();
    this.hasSeatForToday = this.hasSeatBookingForToday(); 
    const data = JSON.parse(localStorage.getItem('attendance_' + today) || '{}');
    this.checkInTime = data.checkInTime || null;
    this.checkOutTime = data.checkOutTime || null;


    if (this.checkInTime && this.checkOutTime) {
      const inDate = new Date(`2000-01-01T${this.checkInTime}`);
      const outDate = new Date(`2000-01-01T${this.checkOutTime}`);

      if (outDate < inDate) outDate.setDate(outDate.getDate() + 1); // handle overnight

      const hoursWorked = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60);

      if (hoursWorked >= 10) {
        this.status = 'Overtime';
      } else if (hoursWorked >= 7) {
        this.status = 'Present';
      } else if (hoursWorked>4 && hoursWorked<6){
        this.status = 'Half-day'
      } 
      else {
        this.status = 'Absent';
      }
      
    } else if (this.checkInTime && !this.checkOutTime) {
      this.status = 'In-Progress';
    } else {
      this.status = 'Not started';
    }
  }

  checkIn() {
    if (!this.hasSeatBookingForToday()) {
      this.errorMessage = 'You have no seat booked for now.';
      return;
    }
  
    const now = new Date().toTimeString().split(' ')[0]; // HH:mm:ss format
    this.checkInTime = now;
    this.saveAttendance('checkInTime', now);
    this.errorMessage = '';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/mark_attendance']);
    });
  }
  
  

  checkOut() {
    const now = new Date().toTimeString().split(' ')[0]; // HH:mm:ss format
    this.checkOutTime = now;
    this.saveAttendance('checkOutTime', now);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/mark_attendance']);
    });
  }

  get checkedIn(): boolean {
    return !!this.checkInTime;
    
  }

  get checkedOut(): boolean {
    return !!this.checkOutTime;
  }

  private getTodayKey(): string {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const user = this.authService.getCurrentUser()?.username || 'unknown';
  return `${user}_attendance_${today}`;
  }

  private saveAttendance(key: string, time: string): void {
    const today = this.getTodayKey();
    let data = JSON.parse(localStorage.getItem('attendance_' + today) || '{}');
    data[key] = time;
    if (data.checkInTime && data.checkOutTime) {
      const inDate = new Date(`2000-01-01T${data.checkInTime}`);
      const outDate = new Date(`2000-01-01T${data.checkOutTime}`);

      if (outDate < inDate) outDate.setDate(outDate.getDate() + 1);

      const hoursWorked = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60);

      if (hoursWorked >= 10) {
        data.status = 'Overtime';
      } else if (hoursWorked >= 7) {
        data.status = 'Present';
      } else if (hoursWorked >3 && hoursWorked <7){
        data.status = 'Half-day';
      }      
      else {
        data.status = 'Absent';
      }
    }
    localStorage.setItem('attendance_' + today, JSON.stringify(data));
  }

  public getAttendance(user: string): any {
    const history: any[] = [];
    const today = new Date().toISOString().split('T')[0]; // e.g., '2025-04-11'
    let todayAttendance = null;
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
  
      if (key && key.startsWith(`attendance_${user}_attendance_`)) {
        const date = key.replace(`attendance_${user}_attendance_`, '');
        const data = JSON.parse(localStorage.getItem(key) || '{}');
  
        const entry = {
          date,
          checkInTime: data.checkInTime || null,
          checkOutTime: data.checkOutTime || null,
          status: data.status || 'Not available'
        };
  
        history.push(entry);
  
        if (date === today) {
          todayAttendance = entry;
        }
      }
    }
  
    return {
      user,
      today: todayAttendance,
      history
    };
  }
  
  
}