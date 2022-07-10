export interface ICsvTable<T> {
  list: Array<T>,
  columns: Array<keyof T>
}

export interface IBillItem {
  time: string,
  amount: string,
  category: string,
  type: string
}

export interface ICategoriesItem {
  id: string,
  type: string,
  name: string,
}

export type IBillItemKey = keyof IBillItem

export type ICategoriestemKey = keyof ICategoriesItem

export interface IBill extends ICsvTable<IBillItem> {
  columns: Array<IBillItemKey>,
  list: Array<IBillItem>
}

export interface ICategories extends ICsvTable<ICategoriesItem> {
  columns: Array<ICategoriestemKey>,
  list: Array<ICategoriesItem>
}
