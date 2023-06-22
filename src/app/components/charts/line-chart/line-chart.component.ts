import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: [],
})
export class LineChartComponent {
  @ViewChild('chart') chart: ElementRef | undefined;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    new Chart(this.chart?.nativeElement, {
      type: 'line',
      options: {
        responsive: true,
      },
      data: {
        labels: [
          '01/02/2023',
          '03/02/2023',
          '04/02/2023',
          '05/02/2023',
          '06/02/2023',
          '07/02/2023',
        ], //título
        datasets: [
          {
            label: 'saídas',
            data: [85, 72, 48, 36, 55, 48, 300],
            borderColor: '#f82727',
            fill: true,
          },
          {
            label: 'entradas',
            data: [32, 75, 25, 87, 33, 21, 48],
            borderColor: '#27f885',
          },
          {
            label: 'balanço',
            data: [-32, 27, 80, 20, 35, 28, 72],
            borderColor: '#272ef8',
          },
        ],
      },
    });
  }
}
