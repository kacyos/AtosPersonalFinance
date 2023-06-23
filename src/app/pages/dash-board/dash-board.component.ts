import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { ITransaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { ArrayTransForm } from 'src/app/utils/arrayTransform';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent {
  @ViewChild('chart') chart: ElementRef | undefined;
  labels: string[] = [];
  expenses: number[] = [];
  revenues: number[] = [];
  totalExpenses: string = '0';
  totalRevenues: string = '0';
  balance: string = '0';

  constructor(private transactionService: TransactionService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.transactionService.getAllTransactions().subscribe((transactions) => {
      this.sumExpensesAndRevenues(transactions);
    });

    this.transactionService
      .getLastTransactionsFromSevenDays(1)
      .subscribe((transaction) => {
        const { labels, expenses, revenues } = this.transformArray(transaction);
        new Chart(this.chart?.nativeElement, {
          type: 'line',
          options: {
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context: any) => {
                    if (context.dataset.label === 'entradas') {
                      return `Entrada - R$ ${context.parsed.y}`;
                    }
                    return `Saída - R$ ${context.parsed.y}`;
                  },
                },
              },
            },
          },
          data: {
            labels: labels, //título
            datasets: [
              {
                label: 'saídas',
                data: expenses,
                borderColor: '#f82727',
                fill: true,
              },
              {
                label: 'entradas',
                data: revenues,
                borderColor: '#27f885',
              },
            ],
          },
        });
      });
  }

  transformArray(transactions: ITransaction[]) {
    const labels: string[] = [];
    const expenses: number[] = [];
    const revenues: number[] = [];

    ArrayTransForm.groupByDayAndType(transactions).forEach((transaction) => {
      labels.push(transaction.date.toString());
      if (transaction.type === 'expense') {
        expenses.push(transaction.value);
      } else {
        revenues.push(transaction.value);
      }
    });

    return { labels, expenses, revenues };
  }

  sumExpensesAndRevenues(array: ITransaction[]) {
    let expenses: number = 0;
    let revenues: number = 0;
    const { expenses: arrayExpenses, revenues: arrayRevenues } =
      this.transformArray(array);

    arrayExpenses.forEach((value) => (expenses += value));
    arrayRevenues.forEach((value) => (revenues += value));

    this.totalRevenues = revenues.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    this.totalExpenses = expenses.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    this.balance = (revenues - expenses).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
