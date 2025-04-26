import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent {
  formData = {
    productname: '',
    category: ''
  };
  products: any[] = [];
  prediction: any;
  isLoading = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err)
    });
  }

  onProductChange(productName: string): void {
    const product = this.products.find(p => p.productname === productName);
    this.formData.category = product ? product.category : '';
  }

  predict(): void {
    this.isLoading = true;
    this.error = null;

    this.http.post<any>('http://127.0.0.1:5000/predict', this.formData)
      .subscribe({
        next: (response) => {
          this.prediction = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la prédiction :', error);
          this.error = 'Une erreur est survenue lors du calcul des prédictions. Veuillez réessayer.';
          this.isLoading = false;
        }
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
