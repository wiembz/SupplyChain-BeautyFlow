import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit {
  formData = {
    productname: '',
    category: ''
  };

  prediction: any;
  isLoading = false;
  error: string | null = null;
  returnPath: string = '/SCPM'; // Default return path
  showPowerBIVisual: boolean = false;
  powerBIUrl: SafeResourceUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    // Power BI visualization URL for prediction insights
    this.powerBIUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=55dddfc1-f8ae-4fba-bb09-92f2972c535b&pageId=predictInsights&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
    );
  }

  ngOnInit(): void {
    // Get the return path from route parameters if available
    this.route.queryParams.subscribe(params => {
      if (params['returnTo']) {
        this.returnPath = params['returnTo'];
      }
    });
  }

  predict() {
    this.isLoading = true;
    this.error = null;

    this.http.post<any>('http://127.0.0.1:5000/predict', this.formData)
      .subscribe(
        (response) => {
          this.prediction = response;
          this.isLoading = false;
          // Show Power BI visuals after successful prediction
          this.showPowerBIVisual = true;
          // Save prediction to localStorage for Power BI integration
          this.savePredictionForPowerBI();
        },
        (error) => {
          console.error('Error during prediction:', error);
          this.error = 'An error occurred while calculating predictions. Please try again.';
          this.isLoading = false;
        }
      );
  }

  savePredictionForPowerBI() {
    // Save the prediction data to localStorage for Power BI to access
    if (this.prediction) {
      const powerBIData = {
        productName: this.formData.productname,
        category: this.formData.category,
        temperature: this.prediction.temperature,
        humidity: this.prediction.humidity,
        timestamp: new Date().toISOString()
      };

      // Get existing predictions or initialize empty array
      const existingData = JSON.parse(localStorage.getItem('predictionsData') || '[]');
      existingData.push(powerBIData);

      // Save updated predictions
      localStorage.setItem('predictionsData', JSON.stringify(existingData));
    }
  }

  backToDashboard() {
    this.router.navigate([this.returnPath]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  togglePowerBIVisual() {
    this.showPowerBIVisual = !this.showPowerBIVisual;
  }
}
