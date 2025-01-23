import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import AdminMain from './AdminSideFiles/Layouts/AdminMain'

const Main = () => {
  return (
    <>
        <BrowserRouter>
            <ToastContainer theme='dark'/>
            <Routes>
                <Route path={'/'} element={<div>Front side</div>}/>
                <Route path={'/admin/*'} element={<AdminMain />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Main