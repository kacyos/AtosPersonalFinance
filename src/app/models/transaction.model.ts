import { ICategory } from './category.model';

export interface ITransaction {
  id?: number;
  type: string;
  value: number;
  date: string;
  userId: number;
  categoryId: number;
  category?: ICategory;
  description?: string;
}
