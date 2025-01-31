import React , { useEffect, useState } from 'react'
import { useOutletContext  } from 'react-router-dom'
import style from '../CSSFiles/Experience.module.css'

const Experience = () => {

  const { userData } = useOutletContext();
  const [loading , setLoading] = useState(true);

  const GETEXPERIENCEFRONT_URL = `${process.env.REACT_APP_BASE_URL}/readexperienceinfofront`;
  const [experienceData , setExperienceData] = useState([]);

  useEffect(() => {
      const getExperienceDetails = async () => {
          const response = await fetch(`${GETEXPERIENCEFRONT_URL}/${userData[0]._id}`);
          const responded = await response.json();
          if(responded.Result === true){
            setExperienceData(responded.data);
            setLoading(false);
          }
      }
      getExperienceDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  return (
    <>
        {
          loading ?
          <div className="row d-flex justify-content-center align-items-center">
              <div className="col-4">
                  <h1 className="text-center">&nbsp;</h1>
              </div>
          </div>
          :
          <>
            <div className="col-12 text-white mt-5">
              <div className="row">
                <div className="col">
                  <h3 className='ms-4 fs-1'><b>Experience</b></h3>
                </div>
              </div>
            </div>
            <div className="col text-white mt-5">
                {
                  experienceData.map((item) => {
                    return(
                      <div className="row ms-5 mt-4" key={item._id}>
                        <div className="col-md-2 col-12" >
                          <div className={`${style.year_button} px-3 py-2 d-flex align-items-center fs-3`}>{item.year}</div>
                        </div>
                        <div className="col-md-10 col-12 mt-3 mt-md-0" >
                          <h3 className='fs-2'>{item.roleName}</h3>
                          <p className='fs-4'>{item.companyName},{item.companyLocation}</p>
                          <p className='me-2 fs-5'>{item.roleDescription}</p>
                        </div>
                      </div>
                    )
                  })
                }
            </div>
          </>
        }
    </>
  )
}

export default Experience