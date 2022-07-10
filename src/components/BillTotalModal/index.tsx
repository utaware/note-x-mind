import { useEffect, useMemo, useState } from 'react'

import { Modal, Tag } from 'antd'

import type { ModalProps } from 'antd'

import { IBillTableRows } from '@/typings/bill'
import { ICategoriesItem } from '@/typings/categories'

import { categoriesFormat } from '@/lib/formatBill'

import hub from '@/lib/hub'

import './index.css'

interface IBillTotalProps {
  dataSource: IBillTableRows[],
  categoriesList: ICategoriesItem[],
  filterDateString: string,
  filterType: string,
  filterCategories: string
}

const app: React.FC<IBillTotalProps> = function (props) {

  const { dataSource, filterDateString, filterCategories, categoriesList } = props

  const [isModalVisible, setModalVisible] = useState<ModalProps['visible']>(false)

  const handleOk: ModalProps['onOk'] = () => {
    setModalVisible(false)
  }

  const handleCancel: ModalProps['onCancel'] = () => {
    setModalVisible(false)
  }

  const { categoriesFormatLabel, typeFormatLabel } = categoriesFormat(filterCategories, categoriesList)

  const timeText = useMemo(() => {
    return filterDateString? (<Tag color="blue">{filterDateString}</Tag>) : ''
  }, [filterDateString])

  const typeText = useMemo(() => {
    return typeFormatLabel ? (<Tag color="cyan">{typeFormatLabel}</Tag>) : ''
  }, [typeFormatLabel])

  const categoryText = useMemo(() => {
    return categoriesFormatLabel ? (<Tag color="purple">{categoriesFormatLabel}</Tag>) : ''
  }, [categoriesFormatLabel])

  // 收入
  const incomeAll = useMemo(() => {
    return dataSource.filter((item) => {
      const { type } = item
      return Number(type) === 1
    }).reduce((t, c) => {
      const { amount } = c
      t += Number(amount)
      return t
    }, 0)
  }, [dataSource])

  const constAll = useMemo(() => {
    return dataSource.filter((item) => {
      const { type } = item
      return Number(type) === 0
    }).reduce((t, c) => {
      const { amount } = c
      t += Number(amount)
      return t
    }, 0)
  }, [dataSource])

  useEffect(() => {
    hub.on('toggleTotalModalVisible', setModalVisible)
    return function () {
      hub.off('toggleTotalModalVisible', setModalVisible)
    }
  }, [])

  return (<div>
    <Modal title="合计账单"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div style={{ marginBottom: '12px' }}>
        <ul className="total-tag-list">
          <li>{ timeText }</li>
          <li>{ typeText }</li>
          <li>{ categoryText }</li>
        </ul>
        总收入: { incomeAll }, 总支出: { constAll }
      </div>
    </Modal>
  </div>)
}

export default app
