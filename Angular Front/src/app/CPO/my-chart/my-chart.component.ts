import { Component } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent {
  // Données de la série
  seriesData = [147.21834040767462, 146.86056468322707, 146.56464143407956, 146.31987756833308, 146.1174286220345, 145.9499791673023, 145.8114784716812, 145.69692185686142, 145.6021698562299, 145.5237986365687, 145.45897627893783, 145.40536044819032];

  // Configuration du graphique
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Prédiction des prix des matières premières cosmétiques'
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month'
        },
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12
        }
      },
      y: {
        beginAtZero: false, // Ne pas forcer à zéro
        ticks: {
          callback: (value: any) => parseFloat(value).toFixed(2) // Formater les ticks
        },
        title: {
          display: true,
          text: 'Prix simulé (€)'
        },
        suggestedMin: Math.min(...this.seriesData) - 1, // Min dynamique
        suggestedMax: Math.max(...this.seriesData) + 1  // Max dynamique
      }
    }
  };

  // Données à afficher sur le graphique
  chartData: ChartData = {
    labels: [
      '2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01',
      '2022-06-01', '2022-07-01', '2022-08-01', '2022-09-01', '2022-10-01',
      '2022-11-01', '2022-12-01'
    ],
    datasets: [
      {
        label: 'Prix des matières',
        data: this.seriesData,
        fill: false,
        borderColor: 'blue',
        tension: 0.1
      }
    ]
  };
}
