import React from 'react'
import Topbar from './Topbar'
import '../../style/layout.scss'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div className="layout-container">
       <Topbar />
      <div id='sidebar-outlet-container'>
        <Sidebar/>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout