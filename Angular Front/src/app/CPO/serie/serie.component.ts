import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { SerieService } from '../../services/serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {
  material: string = '';      // Selected material
  steps: number = 12;         // Number of months to predict
  forecast: number[] = [];    // Forecast results
  error: string | null = null; // Possible error
  materials: string[] = [];   // List of available materials

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Raw Material Price Forecast'
      },
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months'
        },
        ticks: {
          autoSkip: true
        }
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value: any) {
            return Number(value).toFixed(2);
          }
        },
        title: {
          display: true,
          text: 'Simulated Price (€)'
        }
      }
    }
  };

  constructor(
    private serieService: SerieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Load the list of materials when the component is loaded
    this.loadMaterials();
  }

  loadMaterials() {
    this.serieService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
      },
      error: (err) => {
        console.error('Error retrieving materials:', err);
      }
    });
  }

  getSerie() {
    if (!this.material) {
      this.error = 'Please select a material.';
      return;
    }

    this.serieService.getForecast(this.material, this.steps).subscribe({
      next: (data) => {
        this.forecast = data.forecast;
        this.error = null;

        const labels = Array.from({ length: this.steps }, (_, i) => `Month ${i + 1}`);

        this.chartData = {
          labels,
          datasets: [{
            data: this.forecast,
            label: `Forecast - ${this.material}`,
            borderColor: '#ff6a95',
            backgroundColor: 'rgba(252, 142, 172, 0.2)',
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#ff6a95',
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#ff6a95',
            pointBorderColor: '#fff',
            pointHoverBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2
          }]
        };
      },
      error: (err) => {
        this.forecast = [];
        this.error = err.error?.error || 'Unknown error.';
      }
    });
  }

  backToDashboard() {
    this.router.navigate(['/CPO']); // Navigate back to CPO dashboard
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
