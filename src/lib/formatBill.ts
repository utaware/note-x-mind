import type { Moment } from 'moment'

import moment from 'moment'

import { IBillItem, IBillTimeInfo, IBillategoriesInfo } from '@/typings/bill'

import { ICategoriesList } from '@/typings/categories'

// 时间格式化
export function timeFormat (item: IBillItem): IBillTimeInfo {
  const { time } = item
  const momentTime = moment(new Date(+time))
  const timeFormatLabel = getTimeLabel(momentTime)
  const month = momentTime.month()
  const year = momentTime.year()
  return {
    momentTime,
    timeFormatLabel,
    month,
    year
  }
}

// 分类名称转化
export function categoriesFormat (category: string, list: ICategoriesList): IBillategoriesInfo {
  let categoriesFormatLabel = ''
  let typeFormatLabel = ''
  list.some((v) => {
    const { id, name, type } = v
    if (category === id) {
      categoriesFormatLabel = name
      typeFormatLabel = getTypeLabel(type)
      return
    }
  })
  return { categoriesFormatLabel, typeFormatLabel }
}


export function getTimeLabel (m: Moment, f: string = 'YYYY-MM'): string {
  return m.format(f)
}

export function getTypeLabel (type: string): string {
  let typeFormatLabel = ''
  switch (type) {
    case '0':
      typeFormatLabel = '支出'
      break
    case '1':
      typeFormatLabel = '收入'
      break
    default:
      break
  }
  return typeFormatLabel
}
