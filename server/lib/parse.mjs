
export default function (content) {
  const [ columns, ...rows] = content.split('\n').map((row) => {
    return row.split(',')
  })
  const list = rows.map((tr) => {
    return columns.reduce((result, key, index) => {
      result[key] = tr[index]
      return result
    }, {})
  })
  return list
}
