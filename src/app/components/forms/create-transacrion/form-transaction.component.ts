import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { ITransaction } from 'src/app/models/transaction.model';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DateConverter } from 'src/app/utils/date';

@Component({
  selector: 'app-form-transaction',
  templateUrl: './form-transaction.component.html',
  styleUrls: ['./form-transaction.component.css'],
})
export class FormCreateTransactionComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  @Output()
  registerNewTransaction = new EventEmitter<any>();
  @Input()
  transactionEdit?: ITransaction;

  categories: ICategory[] = [];

  transactionForm!: FormGroup;

  ngOnInit(): void {
    this.getAllCategories();

    this.transactionForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', [
        Validators.maxLength(50),
        Validators.nullValidator,
      ]),
    });
  }

  create(transaction: ITransaction) {
    this.registerNewTransaction.emit(transaction);
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      return;
    }

    this.transactionService
      .postCreateTransaction({
        ...this.transactionForm.value,
        date: DateConverter.ConvetDateInput(this.date),
      })

      .subscribe((transaction) => {
        this.create(transaction);
      });
    this.transactionForm.reset();
  }

  get type() {
    return this.transactionForm.get('type')!;
  }

  get value() {
    return this.transactionForm.get('value')!;
  }

  get category_id() {
    return this.transactionForm.get('category_id')!;
  }

  get date() {
    return this.transactionForm.get('date')!.value;
  }

  get description() {
    return this.transactionForm.get('description')!;
  }
}
