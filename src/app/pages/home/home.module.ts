import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LineChartComponent } from '../../components/charts/line-chart/line-chart.component';
import { TransactionService } from 'src/app/services/transaction.service';

@NgModule({
  declarations: [HomeComponent, LineChartComponent],
  imports: [HttpClientModule, CommonModule],
  providers: [TransactionService],
})
export class HomeModule {}
