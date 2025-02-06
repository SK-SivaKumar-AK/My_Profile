import React , { useEffect, useState } from 'react'
import { useOutletContext  } from 'react-router-dom'
import style from '../CSSFiles/Dashboard.module.css'

const Dashboard = () => {

  const { userData } = useOutletContext();
  const [loading , setLoading] = useState(true);

  const GETDASHBOARDFRONT_URL = `${process.env.REACT_APP_BASE_URL}/readdashboardinfofront`;
  const [dashboardData , setDashboardData] = useState([]);
  
  useEffect(() => {
      const getDashboardDetails = async () => {
          const response = await fetch(`${GETDASHBOARDFRONT_URL}/${userData[0]._id}`);
          const responded = await response.json();
          if(responded.Result === true){
              setDashboardData(responded.data);
              setLoading(false);
          }
      }
      getDashboardDetails();
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
            <div className="col-lg-5 col-12 text-white d-flex flex-column justify-content-center align-items-lg-end align-items-center">
              <p><span className="fs-2">I'M</span>
                <span className={`ms-3 ${style.name}`}>
                  {userData[0].userName.split('').map((char, index) => (
                    <span key={index} className={`${style.letter}`} style={{ animationDelay: `${index * 0.1}s` }} >
                      <b>{char}</b>
                    </span>
                  ))}
                </span>
              </p>
              <p className="fs-2">{dashboardData[0].mainContent}</p>
              <p className="fs-4">{dashboardData[0].subContent}</p>
            </div>
            <div className="col-lg-6 col-12 mt-2">
                <img className={`${style.fade_image}`} src={`${process.env.REACT_APP_BASE_URL}/assets/uploads/images/${dashboardData[0].userImage}`} alt="userImage" width='100%' height='100%'/>
            </div>
            <div className="col-lg-auto col-12 text-white d-flex flex-lg-column justify-content-lg-end justify-content-between mt-5">
                <a href="https://www.instagram.com/_siva.sk_?igsh=MTE5NHNrMzRmNnV1bg==" className='text-white'><i className="bi bi-instagram mt-2 fs-3"></i></a>
                <a href="https://wa.me/12345678900" className='text-white'><i className="bi bi-whatsapp mt-2 fs-3"></i></a>
                <a href="https://www.linkedin.com/in/siva-kumar-862a6134a/" className='text-white'><i className="bi bi-linkedin mt-2 fs-3"></i></a>
                <a href="https://www.facebook.com/share/193KLBssvj/" className='text-white'><i className="bi bi-facebook mt-2 fs-3"></i></a>
            </div>
          </>
        }
        
    </>
  )
}

export default Dashboard