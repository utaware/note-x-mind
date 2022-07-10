import type { Moment } from 'moment'
// bill 单条数据信息
export interface IBillItem {
  time: string,
  amount: string,
  category: string,
  type: string,
}
// bill 附加时间信息
export interface IBillTimeInfo {
  momentTime: Moment,
  timeFormatLabel: string,
  month: number,
  year: number
}
// bill 附加类别信息
export interface IBillategoriesInfo {
  categoriesFormatLabel: string,
  typeFormatLabel: string,
}
// bill 表格展示信息
export interface IBillTableRows extends IBillItem, IBillTimeInfo, IBillategoriesInfo {
  index: number,
  key: number
}
