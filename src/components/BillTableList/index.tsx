import type { ColumnsType } from 'antd/lib/table'

import { green, red } from '@ant-design/colors';

import { Table } from 'antd'

import { IBillTableRows } from '@/typings/bill'

const columns: ColumnsType<IBillTableRows> = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 80,
    sorter (m, n) {
      return Number(m.index) - Number(n.index)
    }
  },
  {
    title: '时间',
    dataIndex: 'timeFormatLabel',
    width: 180,
    sorter (m, n) {
      return Number(m.time) - Number(n.time)
    }
  },
  {
    title: '分类',
    dataIndex: 'categoriesFormatLabel',
    width: 120
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 120,
    sorter (m, n) {
      return Number(m.amount) - Number(n.amount)
    },
    onCell (record) {
      const { amount, type } = record
      const realAmount = Number(amount) * (Number(type) ? -1 : 1)
      const color = realAmount > 0 ? red.primary : green.primary
      return { style: { color } }
    }
  },
  {
    title: '类型',
    dataIndex: 'typeFormatLabel',
    width: 80
  },
]

interface IBillTableProps {
  dataSource: IBillTableRows[]
}

const App: React.FC<IBillTableProps> = (props) => {
  // props
  const { dataSource } = props

  return (
    <div className="bill-table-container">
      {/* 表格 */}
      <Table dataSource={dataSource} columns={columns} size="middle" bordered />
    </div>
  )
}

export default App
