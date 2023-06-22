import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ITransaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: [],
  providers: [TransactionService],
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('chart') chart: ElementRef | undefined;

  @Input() labels: string[] = [];
  @Input() expenses: string[] = [];
  @Input() revenues: string[] = [];

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {}
}
