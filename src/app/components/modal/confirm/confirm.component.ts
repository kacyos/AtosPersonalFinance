import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent {
  @Input()
  modalTitle?: string;
  @Input()
  modalMessage?: string;

  @Output()
  confirm = new EventEmitter<any>();

  handleConfirm() {
    this.confirm?.emit();
  }
}
