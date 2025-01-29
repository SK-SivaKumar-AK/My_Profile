import React , { useEffect, useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import FrontMainPage from './FrontMainPage'
import Dashboard from '../Components/Dashboard'
import AboutMe from '../Components/AboutMe'
import Projects from '../Components/Projects'
import Experience from '../Components/Experience'
import Testmonial from '../Components/Testmonial'
import ContactMe from '../Components/ContactMe'
import SingleProject from '../Components/SingleProject'


const FrontMain = () => {

  const [loading , setLoading] = useState(true);

  const GETUSERFRONT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/getuserfront`;
  const [userData , setUserData] = useState([]);
  

  useEffect(() => {
      const getUserDetails = async () => {
          const response = await fetch(GETUSERFRONT_URL);
          const responded = await response.json();
          if(responded.Result === true){
              setUserData(responded.data);
              setLoading(false);
          }
      }
      getUserDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  return (
    <>
        <Routes>
            <Route path={'/'} element={<FrontMainPage userData={userData} loading={loading}/>}>
              <Route index element={<Dashboard/>} />
              <Route path={'/'} element={<Dashboard/>} />
              <Route path={'/aboutme'} element={<AboutMe/>} />
              <Route path={'/projects'} element={<Projects/>} />
              <Route path={'/projects/:id'} element={<SingleProject/>} />
              <Route path={'/experience'} element={<Experience/>} />
              <Route path={'/testmonial'} element={<Testmonial/>} />
              <Route path={'/contactme'} element={<ContactMe/>} />
            </Route>
        </Routes>
    </>
  )
}

export default FrontMain