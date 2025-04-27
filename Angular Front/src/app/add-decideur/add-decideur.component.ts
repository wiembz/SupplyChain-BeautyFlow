import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-decideur',
  templateUrl: './add-decideur.component.html',
  styleUrls: ['./add-decideur.component.css']
})
export class AddDecideurComponent {
  decideur = {
    username: '',
    password: '',
    email: '',
    role: '' // Default role as per your backend
  };
  errorMessage = '';
  successMessage = '';
  roles = ['CPO', 'COO', 'SCPM', 'LM'];

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.addDecideur(this.decideur).subscribe(
      (response) => {
        this.successMessage = 'Décideur ajouté avec succès';
        // Optionally reset the form
        this.decideur = {
          username: '',
          password: '',
          email: '',
          role: ''
        };
      },
      (error) => {
        this.errorMessage = error.error.error || "Une erreur s'est produite";
      }
    );
  }
}