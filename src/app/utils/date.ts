export class DateConverter {
  public static ToLocaleString(date: string | undefined) {
    if (!date) {
      return '';
    }
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  /**
   * Converte uma data do formato "AAAA-MM-DD" para "DD/MM/AAAA".
   * @param date A data no formato "AAAA-MM-DD".
   * @returns A data convertida no formato "DD/MM/AAAA".
   */
  public static ConvetDateInput(date: string) {
    if (!date) {
      // console.log(this.getSpecificDate(0));
      return this.getSpecificDate(0);
    }
    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  }

  public static getSpecificDate(number: number) {
    const date = new Date();
    date.setDate(date.getDate() + number);
    return date.toLocaleDateString('pt-BR', {});
  }
}
