import React from 'react'
import { Routes , Route } from 'react-router-dom'
import FrontMainPage from './FrontMainPage'
import Dashboard from '../Components/Dashboard'
import AboutMe from '../Components/AboutMe'
import Projects from '../Components/Projects'
import Experience from '../Components/Experience'
import Testmonial from '../Components/Testmonial'
import ContactMe from '../Components/ContactMe'

const FrontMain = () => {
  return (
    <>
        <Routes>
            <Route path={'/'} element={<FrontMainPage />}>
              <Route index element={<Dashboard/>} />
              <Route path={'/'} element={<Dashboard/>} />
              <Route path={'/aboutme'} element={<AboutMe/>} />
              <Route path={'/projects'} element={<Projects/>} />
              <Route path={'/experience'} element={<Experience/>} />
              <Route path={'/testmonial'} element={<Testmonial/>} />
              <Route path={'/contactme'} element={<ContactMe/>} />
            </Route>
        </Routes>
    </>
  )
}

export default FrontMain