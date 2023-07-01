import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: [],
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: string = 'success';
}
