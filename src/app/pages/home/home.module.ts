import { ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LineChartComponent } from '../../components/charts/line-chart/line-chart.component';

@NgModule({
  declarations: [HomeComponent, LineChartComponent],
  imports: [CommonModule],
})
export class HomeModule {}
