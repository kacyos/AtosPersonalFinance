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
      } else {
        groupedData[key].value += obj.value;
      }

      groupedData[key].date = formattedDate;
    }

    for (const key in groupedData) {
      transformedArray.push(groupedData[key]);
    }

    return transformedArray;
  }

  public static groupByCategory(array: ITransaction[]) {
    const groupedRevenues: { [key: string]: [ITransaction] } = {};
    const groupedExpenses: { [key: string]: [ITransaction] } = {};

    for (const obj of array) {
      const formattedDate = new Date(obj.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const key = obj.category?.name;

      if (obj.type === 'revenue') {
        if (!groupedRevenues[key!]) {
          groupedRevenues[key!] = [{ ...obj, date: formattedDate }];
        } else {
          groupedRevenues[key!].push({ ...obj, date: formattedDate });
        }
      } else {
        if (!groupedExpenses[key!]) {
          groupedExpenses[key!] = [{ ...obj, date: formattedDate }];
        } else {
          groupedExpenses[key!].push({ ...obj, date: formattedDate });
        }
      }
    }

    return { groupedExpenses, groupedRevenues };
  }
}
