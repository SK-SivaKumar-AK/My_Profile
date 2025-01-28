import React from 'react'
import reactjs from '../Images/reactjs.jpg'
import style from '../CSSFiles/Projects.module.css'

const Projects = () => {
  return (
    <>
      <div className="col-12 text-white mt-5">
          <div className="row text-center">
              <div className="col">
                  <h3 className='ms-4 fs-1'><b>My Projects</b></h3>
              </div>
          </div>
      </div>
      <div className="col">
        <div className="row px-5">
            <div className="col-lg-3 col-md-6 col-12 mt-4">
                <div className={`border rounded-3 p-2 text-center ${style.project_div}`}>
                    <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                    <h4>PHP</h4>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-4">
                <div className={`border rounded-3 p-2 text-center ${style.project_div}`}>
                    <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                    <h4>PHP</h4>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-4">
                <div className={`border rounded-3 p-2 text-center ${style.project_div}`}>
                    <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                    <h4>PHP</h4>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-4">
                <div className={`border rounded-3 p-2 text-center ${style.project_div}`}>
                    <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                    <h4>PHP</h4>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-4">
                <div className={`border rounded-3 p-2 text-center ${style.project_div}`}>
                    <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                    <h4>PHP</h4>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-4">
                <div className={`border rounded-3 p-2 text-center ${style.project_div}`}>
                    <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                    <h4>PHP</h4>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Projects