import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import AdminMain from './AdminSideFiles/Layouts/AdminMain'
import FrontMain from './FrontSideFiles/Layouts/FrontMain';

const Main = () => {
  return (
    <>
        <BrowserRouter basename="/admin">
            <ToastContainer theme='dark'/>
            <Routes>
                <Route path={'/*'} element={<FrontMain />}/>
                <Route path={'/admin/*'} element={<AdminMain />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Main