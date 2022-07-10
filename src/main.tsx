import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ConfigProvider } from 'antd'

import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'

import moment from 'moment'

moment.locale('zh-cn')

import 'antd/dist/antd.css'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  // </React.StrictMode>
)
