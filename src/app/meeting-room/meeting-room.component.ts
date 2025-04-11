import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent {
  rooms = [
    { id: 'R1', name: 'Room R1', capacity: 4 },
    { id: 'R2', name: 'Room R2', capacity: 4 },
    { id: 'R3', name: 'Room R3', capacity: 6 },
    { id: 'R4', name: 'Room R4', capacity: 8 }
  ];

  selectedRoom: any = null;
  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';
  bookingError: string = '';

  constructor(public authService: AuthService) {}

  selectRoom(room: any) {
    this.selectedRoom = room;
  }

  bookRoom() {
    if (!this.selectedRoom || !this.selectedDate || !this.startTime || !this.endTime) {
      this.bookingError = 'Please fill in all fields.';
      return;
    }
  
    const bookingKey = 'roomBookings_' + this.selectedDate;
    const existing = JSON.parse(localStorage.getItem(bookingKey) || '[]');
  
    const selectedStart = new Date(`2000-01-01T${this.startTime}`);
    const selectedEnd = new Date(`2000-01-01T${this.endTime}`);
  
    if (selectedEnd <= selectedStart) {
      this.bookingError = 'End time must be after start time.';
      return;
    }
  
    const overlap = existing.find((b: any) => {
      if (b.roomId !== this.selectedRoom.id) return false;
  
      const bookedStart = new Date(`2000-01-01T${b.startTime}`);
      const bookedEnd = new Date(`2000-01-01T${b.endTime}`);
  
      return (
        (selectedStart < bookedEnd && selectedEnd > bookedStart)
      );
    });
  
    if (overlap) {
      this.bookingError = 'This room is already booked for that time.';
      return;
    }
  
    const newBooking = {
      roomId: this.selectedRoom.id,
      roomName: this.selectedRoom.name,
      date: this.selectedDate,
      startTime: this.startTime,
      endTime: this.endTime,
      username: this.authService.getCurrentUser().username
    };
  
    existing.push(newBooking);
    localStorage.setItem(bookingKey, JSON.stringify(existing));
  
    this.bookingError = '';
    alert('Booking confirmed!');
    this.selectedRoom = null;
    this.selectedDate = this.startTime = this.endTime = '';
  }
  
}
