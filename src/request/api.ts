import { IBillList } from '@/typings/bill'
import { ICategoriesList } from '@/typings/categories'

export const api = {
  bill: '/bill',
  categories: '/categories',
}

export type apiKeyType = keyof typeof api

export interface apiKeyDataType {
  'bill': {
    code: number;
    message: string;
    data: IBillList;
  },
  'categories': {
    code: number;
    message: string;
    data: ICategoriesList;
  }
}
