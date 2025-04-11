import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent {
  subject: string = '';
  priority: string = '';
  message: string = '';
  confirmationMessage: string = '';

  constructor(private authService: AuthService) {}

  setPriority(priority: string) {
    this.priority = priority;
  }

  sendMessage() {
    this.confirmationMessage = '';
  
    if (!this.subject || !this.message || !this.priority) {
      this.confirmationMessage = 'Please fill in all fields before sending.';
      return;
    }
  
    const username = this.authService.getCurrentUser()?.username || 'anonymous';
  
    const messageData = {
      user: username,
      subject: this.subject,
      message: this.message,
      priority: this.priority,
      timestamp: new Date().toISOString()
    };
  
    const key = 'managerMessages';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(messageData);
    localStorage.setItem(key, JSON.stringify(existing));
  
    // Clear form
    this.subject = '';
    this.priority = '';
    this.message = '';
  
    this.confirmationMessage = 'Message sent.';
  
    setTimeout(() => {
      this.confirmationMessage = '';
    }, 3000);
  }
  
}
