import { IBillItem } from '@/typings/bill'

interface ICsv <T>{
  columns: Array<keyof T>,
  rows: string[][]
}

export function parseCsvContent <T>(content: string): ICsv<T> {
  const [ headlines, ...rows] = content.split('\n').map((row) => {
    return row.split(',')
  })
  const columns = (headlines as Array<keyof T>)
  return { columns, rows }
}

export default function (content: string): Array<IBillItem> {
  const { rows, columns } = parseCsvContent<IBillItem>(content)
  const list = rows.map((tr) => {
    return columns.reduce(<T extends keyof IBillItem>(result: IBillItem, key: T, index: number) => {
      result[key] = tr[index]
      return result
    }, {} as IBillItem)
  })
  return list
}
