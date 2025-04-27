import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent {
  shopname: string = '';
  date: string = '';
  total_amount: number | null = null;
  errorMessage: string = '';

  constructor(
    private predictionService: PredictionService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.predictionService.getPrediction(this.shopname, this.date)
      .subscribe({
        next: (result) => {
          this.total_amount = result; // 👈 number direct
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la prédiction.';
          this.total_amount = null;
        }
      });
  }

  backToDashboard() {
    this.router.navigate(['/lm']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
