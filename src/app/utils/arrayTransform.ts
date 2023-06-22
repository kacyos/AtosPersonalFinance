import { ITransaction } from '../models/transaction.model';

export class ArrayTransForm {
  /**
   * Transforma um array de transações em um array de transações agrupadas por dia e tipo.
   * @param {ITransaction} array - Array de transações.
   * @returns {ITransaction} Transações agrupadas por dia e tipo.
   */
  public static groupByDayAndType(array: ITransaction[]): ITransaction[] {
    const transformedArray: ITransaction[] = [];
    const groupedData: { [key: string]: ITransaction } = {};

    for (const obj of array) {
      const formattedDate = new Date(obj.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const key = `${formattedDate}_${obj.type}`;

      if (!groupedData[key]) {
        groupedData[key] = {
          ...obj,
        };
      }
      groupedData[key].date = formattedDate;
      groupedData[key].value += obj.value;
    }

    for (const key in groupedData) {
      transformedArray.push(groupedData[key]);
    }

    return transformedArray;
  }
}
