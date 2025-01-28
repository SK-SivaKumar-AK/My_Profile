import React from 'react'
import style from '../CSSFiles/Testmonial.module.css'

const Testmonial = () => {
  return (
    <>
      <div className="col-12 text-white">
        <div className="row text-center">
          <div className="col">
            <h3 className='mt-5 fs-1'><b>Testmonials</b></h3>
          </div>
        </div>
      </div>
      <div className="col">
        <div className={`row d-flex justify-content-center align-items-center ${style.coursal_row}`}>
          <div className="col-10">
            <div id="carouselExample" className={`carousel slide ${style.coursal_content}`}>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className='text-white d-flex flex-column mt-5 justify-content-center align-items-center'>
                    <p className='fs-2'>siva is a best employee</p>
                    <p><span className='fs-3'>owner name</span><span className='ms-2 fs-6'>ceo</span></p>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className='text-white d-flex flex-column mt-5 justify-content-center align-items-center'>
                    <p className='fs-2'>kumar is a best employee</p>
                    <p><span className='fs-3'>owner name</span><span className='ms-2 fs-6'>ceo</span></p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Testmonial