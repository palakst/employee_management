import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  currentUser: string = '';
  showType: 'seat' | 'meeting' = 'seat';

  seatBookings: any[] = [];
  meetingBookings: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUser = user.username;
      this.loadSeatBookings();
      this.loadMeetingBookings();
    }
  }

  loadSeatBookings() {
    const results: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('seatBookings_')) {
        const date = key.replace('seatBookings_', '');
        const data = JSON.parse(localStorage.getItem(key) || '[]');
        data.forEach((b: any) => {
          if (b.username === this.currentUser) {
            results.push({
              type: 'Seat',
              seatNumber: b.seatNumber,
              date: date,
              checkInTime: this.getAttendance(date)?.checkInTime || null,
              checkOutTime: this.getAttendance(date)?.checkOutTime || null,
              status: this.getAttendance(date)?.status || 'Not marked'
            });
          }
        });
      }
    }

    const today = new Date().toISOString().split('T')[0];

    this.seatBookings = results.sort((a, b) => {
      if (a.date === today) return -1;
      if (b.date === today) return 1;
      if (a.date < today && b.date < today) {
        return b.date.localeCompare(a.date); // past dates descending
      }
      if (a.date > today && b.date > today) {
        return a.date.localeCompare(b.date); // future dates ascending
      }
      return a.date < today ? -1 : 1; // past before future
    });
  }

  loadMeetingBookings() {
    const results: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('roomBookings_')) {
        const date = key.replace('roomBookings_', '');
        const data = JSON.parse(localStorage.getItem(key) || '[]');
        data.forEach((b: any) => {
          if (b.username === this.currentUser) {
            results.push({
              type: 'Meeting Room',
              roomId: b.roomId,
              roomName: b.roomName,
              date: b.date,
              startTime: b.startTime,
              endTime: b.endTime,
              checkInTime: this.getAttendance(date)?.checkInTime || null,
              checkOutTime: this.getAttendance(date)?.checkOutTime || null,
              status: this.getAttendance(date)?.status || 'Not marked'
            });
          }
        });
      }
    }

    const today = new Date().toISOString().split('T')[0];

    this.meetingBookings = results.sort((a, b) => {
      if (a.date === today) return -1;
      if (b.date === today) return 1;
      if (a.date < today && b.date < today) {
        return b.date.localeCompare(a.date); // past descending
      }
      if (a.date > today && b.date > today) {
        return a.date.localeCompare(b.date); // future ascending
      }
      return a.date < today ? -1 : 1;
    });
  }

  getAttendance(date: string): any {
    const key = `attendance_${this.currentUser}_attendance_${date}`;
    const data = JSON.parse(localStorage.getItem(key) || '{}');
  
    if (!data || Object.keys(data).length === 0) {
      return {
        checkInTime: null,
        checkOutTime: null,
        status: 'Not marked'
      };
    }
  
    return {
      checkInTime: data.checkInTime || null,
      checkOutTime: data.checkOutTime || null,
      status: data.status || 'Not marked'
    };
  }
  
  
  toggleView(type: 'seat' | 'meeting') {
    this.showType = type;
  }
}
