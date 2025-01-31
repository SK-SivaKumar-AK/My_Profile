import React , { useEffect, useState } from 'react'
import { useOutletContext  } from 'react-router-dom'
import style from '../CSSFiles/AboutMe.module.css'

const AboutMe = () => {

    const { userData } = useOutletContext();
    const [loading , setLoading] = useState(true);

    const GETABOUTFRONT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readaboutinfofront`;
    const [aboutData , setAboutData] = useState([]);

    useEffect(() => {
        const getSkillDetails = async () => {
            const response = await fetch(`${GETABOUTFRONT_URL}/${userData[0]._id}`);
            const responded = await response.json();
            if(responded.Result === true){
                setAboutData(responded.data);
                setLoading(false);
            }
        }
        getSkillDetails();
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
                            <h3 className='ms-4 fs-1'><b>About</b></h3>
                            <p className='ms-5 me-5 mt-4 fs-5'>Hi there! I'm, a passionate Full Stack Web Developer with a strong enthusiasm for building clean, efficient, and responsive web applications. I specialize in both front-end and back-end technologies, and <b className={`${style.about_content_marked}`}>I'm always eager to learn new skills to stay on top of industry trends</b>. I started my journey into web development a couple of years ago, and since then, I've had the opportunity to work on several exciting projects. I enjoy solving complex problems and making sure that users have a seamless experience on the web.</p>
                        </div>
                    </div>
                </div>
                <div className="col text-white mt-5">
                    <div className="row text-center">
                        <div className="col">
                            <h3 className='ms-4 fs-1'><b>My Skills</b></h3>
                        </div>
                    </div>
                    <div className="row px-5 mb-4">
                        {
                            aboutData.map((item) => {
                                return(
                                    <div className="col-lg-3 col-md-6 col-12 mt-4" key={item._id}>
                                        <div className={`border rounded-3 p-2 text-center ${style.skill_color}`}>
                                            <img className={`mt-2 ${style.fade_image}`} src={`${process.env.REACT_APP_BASE_URL}assets/uploads/images/${item.skillImage}`} alt="skillImage" width={'100px'} height={'100px'}/>
                                            <h4 className='mt-3'>{item.skillName}</h4>
                                        </div>
                                    </div>    
                                )
                            })
                        }
                        
                    </div>
                </div>
            </>
        }
    </>
  )
}

export default AboutMe