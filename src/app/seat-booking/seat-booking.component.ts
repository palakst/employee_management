import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss']
})
export class SeatBookingComponent {
  constructor(private authService: AuthService) {}

  fromDate: string = '';
  toDate: string = '';
  seatNumber: number | null = null;
  bookingError: string = '';
  bookingSuccess: string = '';

  bookSeat() {
    this.bookingError = '';
    this.bookingSuccess = '';

    
  if (!this.seatNumber || this.seatNumber < 1 || this.seatNumber > 80) {
    this.bookingError = 'Seat number must be between 1 and 80.';
    return;
  }
  
    if (!this.fromDate || !this.toDate || !this.seatNumber) {
      this.bookingError = 'Please fill in all fields.';
      return;
    }

    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);

    if (from > to) {
      this.bookingError = '"From Date" must be before "To Date".';
      return;
    }

    const datesToBook: string[] = [];
    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) {
        datesToBook.push(d.toISOString().split('T')[0]);
      }
    }

    const username = this.authService.getCurrentUser().username;
    const userConflictDates: string[] = [];

    // Check for conflicts
    for (const date of datesToBook) {
      const key = `seatBookings_${date}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');

      const seatTaken = existing.find((b: any) => b.seatNumber === this.seatNumber);
      if (seatTaken) {
        this.bookingError = `Seat ${this.seatNumber} is already booked on ${date}.`;
        return;
      }

      const userAlreadyBooked = existing.find((b: any) => b.username === username);
      if (userAlreadyBooked) {
        userConflictDates.push(date);
      }
    }

    if (userConflictDates.length > 0) {
      this.bookingError = `You already have a seat booked on: ${userConflictDates.join(', ')}`;
      return;
    }

    // No conflicts, save bookings
    for (const date of datesToBook) {
      const key = `seatBookings_${date}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({
        seatNumber: this.seatNumber,
        username: username
      });
      localStorage.setItem(key, JSON.stringify(existing));
    }

    this.bookingSuccess = `Seat ${this.seatNumber} successfully booked from ${this.fromDate} to ${this.toDate}.`;
    this.fromDate = '';
    this.toDate = '';
    this.seatNumber = null;
  }
}
