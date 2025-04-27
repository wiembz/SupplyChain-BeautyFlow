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
  material: string = '';      // Le matériau sélectionné
  steps: number = 12;          // Nombre de mois à prédire
  forecast: number[] = [];     // Résultats de prévision
  error: string | null = null; // Erreur éventuelle
  materials: string[] = [];    // Liste des matériaux disponibles

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Prévision des prix des matières premières'
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
          text: 'Mois'
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
          text: 'Prix simulé (€)'
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
    // Charger la liste des matériaux au chargement du composant
    this.loadMaterials();
  }

  loadMaterials() {
    this.serieService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
      },
      error: (err) => {
        console.error('Erreur en récupérant les matériaux :', err);
      }
    });
  }

  getSerie() {
    if (!this.material) {
      this.error = 'Veuillez sélectionner un matériau.';
      return;
    }

    this.serieService.getForecast(this.material, this.steps).subscribe({
      next: (data) => {
        this.forecast = data.forecast;
        this.error = null;

        const labels = Array.from({ length: this.steps }, (_, i) => `Mois ${i + 1}`);

        this.chartData = {
          labels,
          datasets: [{
            data: this.forecast,
            label: `Prévision - ${this.material}`,
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
        this.error = err.error?.error || 'Erreur inconnue.';
      }
    });
  }

  backToDashboard() {
    this.router.navigate(['/COO']); // Navigate back to COO dashboard
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
