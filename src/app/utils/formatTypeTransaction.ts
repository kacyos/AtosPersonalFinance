export const fomatTypeTransactionForAPI = (type: string) => {
  let typeTransformed = type;
  if (type === 'Entrada') typeTransformed = 'revenue';
  if (type === 'Saída') typeTransformed = 'expense';
  return typeTransformed;
};

export const fomatTypeTransactionForView = (type: string) => {
  let typeTransformed = type;
  if (type === 'revenue') typeTransformed = 'Entrada';
  if (type === 'expense') typeTransformed = 'Saída';
  return typeTransformed;
};
