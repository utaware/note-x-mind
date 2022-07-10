import type { ModalProps, UploadProps } from 'antd'

import { Upload, Modal, Button, message, Table } from 'antd'

import { UploadOutlined } from '@ant-design/icons'

import React, { useState, useMemo, useEffect } from 'react'

import { IBillItem } from '@/typings/bill'

import parse from './parse'

import axios from '@/request'

import hub from '@/lib/hub'

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    width: 180,
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    width: 120
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    width: 120,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 80
  },
]

const app: React.FC = () => {

  const [ tableData, setTableData ] = useState<Array<IBillItem>>([])

  const [ isModalVisible, setModalVisible ] = useState<boolean>(false)

  const handleOk: ModalProps['onOk'] = () => {
    axios({ url: 'bill', method: 'post', data: tableData }).then((res) => {
      hub.emit('getBillList')
      setModalVisible(false)
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleCancel: ModalProps['onOk'] = () => {
    setModalVisible(false)
  }

  const dataSource = useMemo(()  => {
    return tableData.map((item: IBillItem, i: number) => {
      return { ...item, key: i }
    })
  }, [tableData])

  useEffect(() => {
    hub.on('toggleAddModalVisible', setModalVisible)
    return function () {
      hub.off('toggleAddModalVisible', setModalVisible)
    }
  }, [])

  const billUploadProps: UploadProps = {
    name: 'file',
    accept: '.csv',
    maxCount: 1,
    fileList: [],
    beforeUpload (file) {
      if (!file) {
        return false
      }
      const fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.onload = function () {
        const csvContent = this.result?.toString() ?? ''
        if (csvContent) {
          const data = parse(csvContent)
          setTableData(data)
        } else {
          message.error('文件格式解析错误, 请重新选择')
        }
      }
      return false
    }
  }

  return (
    <div className="bill-add-modal-wrapper">
      <Modal title="添加数据"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ marginBottom: '12px' }}>
          <Upload {...billUploadProps}>
            <Button icon={<UploadOutlined />}>添加账单</Button>
          </Upload>
        </div>
        {/* 表格 */}
        <Table
          dataSource={dataSource}
          columns={columns}
          size="small"
          pagination={{ defaultPageSize: 5 }}
          bordered
        />
      </Modal>
    </div>
  )
}

export default app
