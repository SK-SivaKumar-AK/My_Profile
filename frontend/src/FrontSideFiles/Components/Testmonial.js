import React , { useEffect, useState } from 'react'
import { useOutletContext  } from 'react-router-dom'
import style from '../CSSFiles/Testmonial.module.css'

const Testmonial = () => {

  const { userData } = useOutletContext();
  const [loading , setLoading] = useState(true);

  const GETTESTMONIALFRONT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readtestmonialinfofront`;
  const [testmonialData , setTestmonialData] = useState([]);

  useEffect(() => {
      const getTestmonialDetails = async () => {
          const response = await fetch(`${GETTESTMONIALFRONT_URL}/${userData[0]._id}`);
          const responded = await response.json();
          if(responded.Result === true){
            setTestmonialData(responded.data);
            setLoading(false);
          }
      }
      getTestmonialDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  return (
    <>
      {
        loading ?
        <div className="row vh-100 d-flex justify-content-center align-items-center">
            <div className="col-4">
                <h1 className="text-center">&nbsp;</h1>
            </div>
        </div>
        :
        <>
          <div className="col-12 text-white">
            <div className="row text-center">
              <div className="col">
                <h3 className='mt-5 fs-1'><b>Testimonials</b></h3>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={`row d-flex justify-content-center align-items-center ${style.coursal_row}`}>
              <div className="col-10">
                <div id="carouselExample" className={`carousel slide ${style.coursal_content}`}>
                  <div className="carousel-inner px-5">
                    {
                      testmonialData.map((item , index) => {
                        return(
                          <div className={`carousel-item ${index === 0? 'active' : ''}`} key={item._id}>
                            <div className='text-white d-flex flex-column mt-5 justify-content-center align-items-center'>
                              <p className='fs-2 text-center'>{item.subject}</p>
                              <p className='text-center'><span className='fs-3'>-{item.personName}</span><span className='ms-2 fs-6'>({item.personRole})</span></p>
                            </div>
                          </div>
                        )
                      })
                    }
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
      }
    </>
  )
}

export default Testmonial