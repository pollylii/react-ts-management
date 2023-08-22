import React from 'react'
import ReactDOM from 'react-dom/client'
//初始化样式放在最前
import "reset-css"
//UI框架的样式
// 全局样式
import "@/assets/styles/global.scss"
//组件的样式
import App from './App'
// 路由
import { BrowserRouter } from "react-router-dom"
// 状态管理
import { Provider } from "react-redux";
import store from "./store";
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)