import React from 'react'
import userImage from '../Images/sivask.jpg'
import style from '../CSSFiles/Dashboard.module.css'

const Dashboard = () => {
  return (
    <>
        <div className="col-lg-5 col-12 text-white d-flex flex-column justify-content-center align-items-lg-end align-items-center">
            <p><span className="fs-2">I'M</span><span className={`ms-3 ${style.name}`}><b>SivaKumar</b></span></p>
            <p className="fs-2">Full Stack Developer</p>
        </div>
        <div className="col-lg-6 col-12 mt-2">
            <img src={userImage} alt="userImage" width='100%' height='100%'/>
        </div>
        <div className="col-lg-auto col-12 text-white d-flex flex-lg-column justify-content-lg-end justify-content-between">
            <a href="void()" className='text-white'><i className="bi bi-instagram mt-2 fs-3"></i></a>
            <a href="void()" className='text-white'><i className="bi bi-whatsapp mt-2 fs-3"></i></a>
            <a href="void()" className='text-white'><i className="bi bi-linkedin mt-2 fs-3"></i></a>
            <a href="void()" className='text-white'><i className="bi bi-twitter-x mt-2 fs-3"></i></a>
        </div>
    </>
  )
}

export default Dashboard