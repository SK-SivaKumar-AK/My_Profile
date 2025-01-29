import React from 'react'
import { Routes , Route } from 'react-router-dom'
import AdminEntryPage from './AdminEntryPage'
import AdminLoginPage from '../Components/AdminLoginPage'
import AdminRegisterPage from '../Components/AdminRegisterPage'

import AdminMainPage from './AdminMainPage'
import Dashboard from '../Components/Dashboard';
import AboutMe from '../Components/AboutMe';
import Project from '../Components/Project';
import Experience from '../Components/Experience';
import Testmonial from '../Components/Testmonial';
import ContactMe from '../Components/ContactMe'

const AdminMain = () => {
  return (
    <>
        <Routes>
            <Route path={'/'} element={<AdminEntryPage />}>
                <Route index element={<AdminLoginPage/>} />
                <Route path={'login'} element={<AdminLoginPage/>} />
                <Route path={'register'} element={<AdminRegisterPage/>} />
            </Route>    
            {/* <Route path={'register'} element={<AdminRegisterPage />}/> */}
            <Route path={'/'} element={<AdminMainPage />}>
                <Route index element={<Dashboard/>} />
                <Route path={'dashboard'} element={<Dashboard/>} />
                <Route path={'aboutme'} element={<AboutMe/>} />
                <Route path={'projects'} element={<Project/>} />
                <Route path={'experience'} element={<Experience/>} />
                <Route path={'testmonial'} element={<Testmonial/>} />
                <Route path={'contactme'} element={<ContactMe/>} />
            </Route>
        </Routes>
    </>
  )
}

export default AdminMain