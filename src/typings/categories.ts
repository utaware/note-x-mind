export interface ICategoriesItem {
  id: string,
  type: string,
  name: string,
}

export type ICategoriestemKey = keyof ICategoriesItem

export type ICategoriesList = Array<ICategoriesItem>
