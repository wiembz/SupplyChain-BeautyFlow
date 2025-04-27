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

      // 2. Détermine où rediriger
      const redirectUrl = this.getRedirectUrl(res.role);
      
      // 3. Effectue la redirection
      this.router.navigate([redirectUrl]);
        
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        alert('Identifiants invalides !');
      }
    });
  }
  private getRedirectUrl(role: string): string {
    // Par défaut on redirige vers '/'
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
