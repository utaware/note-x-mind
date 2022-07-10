import { useState, useEffect, useMemo } from 'react'

import type { DatePickerProps, SelectProps, MenuProps } from 'antd'

import { DatePicker, Select, Dropdown, Menu } from 'antd'

import _ from 'lodash'

import axios from '@/request'

import { IBillItem, IBillTableRows } from '@/typings/bill'
import { ICategoriesList } from '@/typings/categories'

import hub from '@/lib/hub'

import {
  timeFormat,
  categoriesFormat,
  getTimeLabel,
} from '@/lib/formatBill'

import './App.css'

const { Option } = Select

import BillTableList from './components/BillTableList'
import BillAddModal from './components/BillAdddModal'
import BillTotalModal from './components/BillTotalModal'

const App: React.FC = () => {
  // bill
  const [ tableData, setTableData] = useState<IBillItem[]>([])
  const [ categoriesList, setCategoriesList] = useState<ICategoriesList>([])
  // filter
  const [ filterDate, setFilterDate ] = useState<SelectProps['value']>()
  const [ filterType, setFilterType ] = useState<SelectProps['value']>()
  const [ filterCategories, setFilterCategories ] = useState<SelectProps['value']>()
  // menuList
  const menuList = [
    { key: 'add', label: '添加' },
    { key: 'reset', label: '重置' },
    { key: 'total', label: '总计' },
    { key: 'clear', label: '清空' },
  ]

  const filterDateString: string = useMemo(() => {
    return filterDate ? getTimeLabel(filterDate) : ''
  }, [filterDate])

  const sourceData: Array<IBillTableRows> = useMemo(() => {
    if (_.isEmpty(tableData)) {
      return []
    }
    return tableData.map((v, i) => {
      const timeOptions = timeFormat(v)
      const categoryOptions = categoriesFormat(v.category, categoriesList)
      return Object.assign({
        key: i,
        index: i + 1,
        ...timeOptions,
        ...categoryOptions,
      }, v)
    })
  }, [tableData, categoriesList])

  const filterData: Array<IBillTableRows> = useMemo(() => {
    return sourceData.filter((item: IBillTableRows) => {
      const { timeFormatLabel, type, category } = item
      const filters = [
        [filterCategories, category],
        [filterType, type],
        [filterDateString, timeFormatLabel]
      ]
      return filters.every(([a, b]) => {
        return !a || a === b
      })
    })
  }, [sourceData, filterCategories, filterDateString, filterType])
  // change
  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    setFilterDate(date)
  }
  const onChangeType: SelectProps['onChange'] = (value: string) => {
    setFilterType(value)
  }
  const onChangeCategories: SelectProps['onChange'] = (value: string) => {
    setFilterCategories(value)
  }
  const onMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e
    switch (key) {
      case 'add':
        hub.emit('toggleAddModalVisible', true)
        break
      case 'total':
        hub.emit('toggleTotalModalVisible', true)
        break
      case 'clear':
        (async () => {
          await clearBill()
          await requestBill()
        })()
        break
      case 'reset':
        setFilterDate(null)
        setFilterType('')
        setFilterCategories('')
        break
    }
  }
  // menu
  const menu = (<Menu
    onClick={onMenuClick}
    items={menuList}
  />)
  // request
  async function requestBill () {
    const resBill = await axios({ url: 'bill' })
    setTableData(resBill.data)
  }
  async function clearBill () {
    await axios({ url: 'bill', method: 'delete' })
  }
  async function requestCategories () {
    const resCategories = await axios({ url: 'categories' })
    setCategoriesList(resCategories.data)
  }
  // mounted
  useEffect(() => {
    (async () => {
      await requestBill()
      await requestCategories()
    })()
    hub.on('getBillList', requestBill)
    return function () {
      hub.off('getBillList', requestBill)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/* filter */}
        <div className="bill-table-filter">
          {/* 类型选择 */}
          <Select value={ filterType } defaultValue="" style={{ width: 150 }} onChange={onChangeType} allowClear>
            <Option value="">全部</Option>
            <Option value="0">支出</Option>
            <Option value="1">收入</Option>
          </Select>
          {/* 分类选择 */}
          <Select value={ filterCategories } defaultValue="" style={{ width: 150 }} onChange={onChangeCategories} allowClear>
            <Option value="">全部</Option>
            {
              categoriesList.map((item, index) => {
                const { id, name } = item
                return <Option value={id} key={index}>{ name }</Option>
              })
            }
          </Select>
          {/* 日期选择 */}
          <DatePicker
            onChange={onChangeDate}
            value={filterDate}
            picker="month"
            placeholder="请选择日期"
            style={{ width: 150 }}
          />
          {/* 操作选择 */}
          <Dropdown.Button overlay={menu}>操作</Dropdown.Button>
        </div>
        {/* table */}
        <BillTableList dataSource={filterData} />
        {/* add-modal */}
        <BillAddModal />
        {/* total-modal */}
        <BillTotalModal
          dataSource={filterData}
          categoriesList={categoriesList}
          filterDateString={filterDateString}
          filterType={filterType}
          filterCategories={filterCategories}
        />

      </header>
    </div>
  )
}

export default App
