import React from 'react'
import style from '../CSSFiles/AboutMe.module.css'
import reactjs from '../Images/reactjs.jpg'

const AboutMe = () => {
  return (
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
            <div className="row px-5">
                <div className="col-lg-3 col-md-6 col-12 mt-4">
                    <div className={`border rounded-3 p-2 text-center ${style.skill_color}`}>
                        <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                        <h4>PHP</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 mt-4">
                    <div className={`border rounded-3 p-2 text-center ${style.skill_color}`}>
                        <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                        <h4>PHP</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 mt-4">
                    <div className={`border rounded-3 p-2 text-center ${style.skill_color}`}>
                        <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                        <h4>PHP</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 mt-4">
                    <div className={`border rounded-3 p-2 text-center ${style.skill_color}`}>
                        <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                        <h4>PHP</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 mt-4">
                    <div className={`border rounded-3 p-2 text-center ${style.skill_color}`}>
                        <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                        <h4>PHP</h4>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 mt-4">
                    <div className={`border rounded-3 p-2 text-center ${style.skill_color}`}>
                        <img src={reactjs} alt="skillImage" width={'200px'} height={'120px'}/>
                        <h4>PHP</h4>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AboutMe