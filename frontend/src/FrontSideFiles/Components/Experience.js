import React from 'react'
import style from '../CSSFiles/Experience.module.css'

const Experience = () => {
  return (
    <>
        <div className="col-12 text-white mt-5">
          <div className="row">
            <div className="col">
              <h3 className='ms-4 fs-1'><b>Experience</b></h3>
            </div>
          </div>
        </div>
        <div className="col text-white mt-5">
          <div className="row ms-5 mt-4">
            <div className="col-md-2 col-12">
              <div className={`${style.year_button} px-3 py-2 d-flex align-items-center fs-3`}>2022</div>
            </div>
            <div className="col-md-10 col-12">
              <h3 className='fs-2 mt-2'>Senior Developer</h3>
              <p className='fs-4'>Greypath,Trichy</p>
              <p className='me-2 fs-5'>As a PHP Full Stack Developer,I am responsible for the end-to-end development of web applications, handling both the frontend and backend development, and ensuring that all elements work seamlessly together. My role encompasses a wide range of tasks, including coding, troubleshooting, deploying applications, and maintaining an efficient workflow between the client-side (frontend) and server-side (backend).</p>
            </div>
          </div>
          <div className="row ms-5 mt-4">
            <div className="col-md-2 col-12">
              <div className={`${style.year_button} px-3 py-2 d-flex align-items-center fs-3`}>2022</div>
            </div>
            <div className="col-md-10 col-12">
              <h3 className='fs-2 mt-2'>Senior Developer</h3>
              <p className='fs-4'>Greypath,Trichy</p>
              <p className='me-2 fs-5'>As a PHP Full Stack Developer,I am responsible for the end-to-end development of web applications, handling both the frontend and backend development, and ensuring that all elements work seamlessly together. My role encompasses a wide range of tasks, including coding, troubleshooting, deploying applications, and maintaining an efficient workflow between the client-side (frontend) and server-side (backend).</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default Experience