import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {
  username = '';
  password = '';
  loginFailed :boolean= false;
  loginSuccess :boolean= false;
  passwordFieldType:string = 'password'

  constructor(private auth: AuthService, private router: Router) {}
  onLogin() {
    this.loginFailed=false
    this.loginSuccess=false
    const success = this.auth.login(this.username, this.password);
    if (success) {
      const role = this.auth.getUserRole();
      this.router.navigate([role === 'manager' ? '/manager' : '/dashboard']);
      this.loginSuccess = true
      this.router.navigate(['/dashboard'])
    } else {
      this.loginFailed = true;
    }

    
  }
  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


}
