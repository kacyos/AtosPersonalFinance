import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { ITransaction } from 'src/app/models/transaction.model';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ArrayTransForm } from 'src/app/utils/arrayTransform';
import { DateConverter } from 'src/app/utils/date';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportsComponent implements OnInit {
  form!: FormGroup;

  categories: ICategory[] = [];
  transactions: ITransaction[] = [];
  revenues: { [key: string]: [ITransaction] } = {};
  expenses: { [key: string]: [ITransaction] } = {};

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  toggleList(id: string) {
    const element = document.getElementById(id || '');
    const collapse = new Collapse(element as HTMLElement);
    collapse.toggle();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      transaction_type: new FormControl(''),
      category_id: new FormControl(''),
      initial_date: new FormControl(''),
      final_date: new FormControl(''),
    });

    this.getAllCategories();
  }

  onSubmit() {
    this.transactionService
      .getFilterTransaction({
        initial_date: DateConverter.ConvetDateInput(this.initial_date?.value),
        final_date: DateConverter.ConvetDateInput(this.initial_date?.value),
        ...this.form.value,
      })
      .subscribe((transactions) => {
        const { groupedExpenses, groupedRevenues } =
          ArrayTransForm.groupByCategory(transactions);
        this.revenues = groupedRevenues;
        this.expenses = groupedExpenses;
      });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  get transaction_type() {
    return this.form.get('transaction_type');
  }
  get category_id() {
    return this.form.get('category_id');
  }
  get initial_date() {
    return this.form.get('initial_date');
  }
  get final_date() {
    return this.form.get('final_date');
  }
}
