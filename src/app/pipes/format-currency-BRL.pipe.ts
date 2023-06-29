import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatCurrencyBRL' })
export class formatCurrencyBRL implements PipeTransform {
  transform(value: number | string | undefined) {
    if (!value) return 'R$ 0,00';

    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
