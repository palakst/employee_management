import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public authService: AuthService, private router: Router){}

  book_seat(){
    this.router.navigate(['/book_seat'])
  }

  book_meeting(){
    this.router.navigate(['/book_meeting_room'])

  }
  check_in_out(){
    this.router.navigate(['/mark_attendance'])

  }
  view_booking(){
    this.router.navigate(['/booking_history'])
  }
  chat_with_manager(){
    this.router.navigate(['/connect_manager'])

  }
  manager_panel(){
    this.router.navigate(['/manager_actions'])

  }
}
