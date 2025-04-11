import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ContactManagerComponent } from '../contact-manager/contact-manager.component';

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.scss']
})
export class ManagerPanelComponent {
  public messages: any[] = [];

constructor(public authService: AuthService, private router: Router){}
ngOnInit(): void {
  const stored = localStorage.getItem('managerMessages');
  this.messages = stored ? JSON.parse(stored) : [];
}
}
