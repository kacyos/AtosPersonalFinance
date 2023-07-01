import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category.model';
import { ITransaction } from 'src/app/models/transaction.model';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DateConverter } from 'src/app/utils/date';

@Component({
  selector: 'app-form-edit-transaction',
  templateUrl: './form-edit-transaction.component.html',
  styleUrls: [],
})
export class FormEditTransactionComponent {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  @Output()
  update = new EventEmitter<any>();

  @Input()
  transactionForEditing?: ITransaction;

  categories: ICategory[] = [];

  editTransactionForm!: FormGroup;

  ngOnInit(): void {
    this.getAllCategories();

    this.editTransactionForm = new FormGroup({
      type: new FormControl(''),
      category_id: new FormControl(''),
      date: new FormControl(''),
      value: new FormControl('', [Validators.min(1)]),
      description: new FormControl('', [
        Validators.maxLength(50),
        Validators.nullValidator,
      ]),
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.editTransactionForm.invalid) {
      return;
    }
    this.handleSubmit();
    this.resetForm();
  }

  handleSubmit() {
    this.update.emit({
      id: this.transactionForEditing?.id,
      type: this.type.value || this.transactionForEditing?.type,
      category_id:
        this.category_id.value || this.transactionForEditing?.categoryId,
      value: this.value.value || this.transactionForEditing?.value,
      date:
        DateConverter.ConvetDateInput(this.date.value) ||
        DateConverter.ToLocaleString(this.transactionForEditing?.date),
      description:
        this.description.value || this.transactionForEditing?.description,
    });
  }

  resetForm() {
    this.editTransactionForm.setValue({
      type: '',
      category_id: '',
      date: '',
      value: '',
      description: '',
    });
  }

  get type() {
    return this.editTransactionForm.get('type')!;
  }

  get value() {
    return this.editTransactionForm.get('value')!;
  }

  get category_id() {
    return this.editTransactionForm.get('category_id')!;
  }

  get date() {
    return this.editTransactionForm.get('date')!.value;
  }

  get description() {
    return this.editTransactionForm.get('description')!;
  }
}
