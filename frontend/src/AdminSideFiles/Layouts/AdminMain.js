import React from 'react'
import { Routes , Route } from 'react-router-dom'
import AdminLoginPage from './AdminLoginPage'
import AdminRegisterPage from './AdminRegisterPage'

const AdminMain = () => {
  return (
    <>
        <Routes>
            <Route path={'/'} element={<AdminLoginPage />}/>    
            <Route path={'register'} element={<AdminRegisterPage />}/>
            <Route path={'dashboard'} element={<div>logged in page</div>}/>
        </Routes>
    </>
  )
}

export default AdminMain