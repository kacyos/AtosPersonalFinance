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
      return '';
    }
    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  }
}
