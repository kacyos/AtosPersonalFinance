import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables, Colors, ChartData } from 'chart.js';
import { ICategory } from 'src/app/models/category.model';

import { ITransaction } from 'src/app/models/transaction.model';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ArrayTransForm } from 'src/app/utils/arrayTransform';
import { DateConverter } from 'src/app/utils/date';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent {
  @ViewChild('chart') chart: ElementRef | undefined;
  @ViewChild('pieChart') pieChart: ElementRef | undefined;

  totalExpenses: string = '0';
  totalRevenues: string = '0';
  balance: string = '0';
  transactions: ITransaction[] = [];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.transactionService
      .getFilterTransaction({
        initial_date: DateConverter.getSpecificDate(-30),
        final_date: DateConverter.getSpecificDate(0),
      })
      .subscribe((transactions) => {
        console.log(transactions);
        this.sumExpensesAndRevenues(transactions);
      });

    this.transactionService
      .getLastTransactionsFromSevenDays()
      .subscribe((transaction) => {
        this.transactions = transaction;
        const { labels, expenses, revenues } =
          this.sepateDataFromArray(transaction);
        const { arrayExpenses, arrayRevenues } = this.transformArrayByChart(
          expenses,
          revenues,
          labels
        );

        this.generateChart(labels, arrayExpenses, arrayRevenues);
      });

    const initialDate = DateConverter.getSpecificDate(-7);
    const finalDate = DateConverter.getSpecificDate(0);

    this.categoryService
      .getListExpensesAndEarnings(initialDate, finalDate)
      .subscribe((categories) => {});
  }

  sepateDataFromArray(transactions: ITransaction[]) {
    const labels: string[] = [];
    const expenses: ITransaction[] = [];
    const revenues: ITransaction[] = [];

    const transactionsGrouped = ArrayTransForm.groupByDayAndType(transactions);

    // Separa as transações por tipo e adiciona as datas em um array
    transactionsGrouped.forEach((transaction) => {
      let date = transaction.date.toString();

      if (!labels.includes(date)) {
        labels.push(date);
      }

      if (transaction.type === 'expense') {
        expenses.push(transaction);
      }

      if (transaction.type === 'revenue') {
        revenues.push(transaction);
      }
    });
    labels.sort();
    return { labels, expenses, revenues };
  }

  transformArrayByChart(
    expenses: ITransaction[],
    revenues: ITransaction[],
    labels: string[]
  ) {
    const arrayExpenses: number[] = [];
    const arrayRevenues: number[] = [];

    labels.forEach((label) => {
      const expense = expenses.find((expense) => expense.date === label);
      if (expense) {
        arrayExpenses.push(expense.value);
      } else {
        arrayExpenses.push(0);
      }

      const revenue = revenues.find((revenue) => revenue.date === label);
      if (revenue) {
        arrayRevenues.push(revenue.value);
      } else {
        arrayRevenues.push(0);
      }
    });

    return { arrayExpenses, arrayRevenues };
  }

  sumExpensesAndRevenues(array: ITransaction[]) {
    let expenses: number = 0;
    let revenues: number = 0;
    const { expenses: arrayExpenses, revenues: arrayRevenues } =
      this.sepateDataFromArray(array);

    arrayExpenses.forEach((item) => (expenses += item.value));
    arrayRevenues.forEach((item) => (revenues += item.value));

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

  generateChart(labels: string[], expenses: number[], revenues: number[]) {
    return new Chart(this.chart?.nativeElement, {
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
  }
}
