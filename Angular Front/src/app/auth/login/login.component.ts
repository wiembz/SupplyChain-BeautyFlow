import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.access_token);
        this.authService.saveRole(res.role);

      // 2. Determine where to redirect
      const redirectUrl = this.getRedirectUrl(res.role);

      // 3. Perform the redirection
      this.router.navigate([redirectUrl]);

      },
      error: (err) => {
        console.error('Login error', err);
        alert('Invalid credentials!');
      }
    });
  }
  private getRedirectUrl(role: string): string {
    // Default redirect to '/'
    let redirectUrl = '/';

    if (role === 'superviseur') {
      redirectUrl = '/home';
    } else if (role === 'COO') {
      redirectUrl = '/COO';
    } else if (role === 'CPO') {
      redirectUrl = '/CPO';
    } else if (role === 'SCPM') {
      redirectUrl = '/SCPM';
    }else if (role === 'LM') {
      redirectUrl = '/LM';
    }

    return redirectUrl;
  }
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
