import React from 'react'
import style from '../CSSFiles/Header.module.css'
//import SkLogo from '../Images/SKLogo.png'
import { Link } from 'react-router-dom'

const Header = ({userData}) => {
  return (
    <>
        <header className={`row p-3 d-flex align-items-center sticky-top`}>
            <div className="col-4 text-center">
                <img src={`${process.env.REACT_APP_BASE_URL}assets/uploads/images/${userData[0].userProfileImage}`} alt="logo" width={'70px'} height={'70px'}/>
            </div>
            <div className="col-6 d-lg-flex d-none justify-content-end">
                <ul className='list-unstyled d-flex'>
                    <Link to={'/'} className='text-decoration-none text-white'><li className={`mt-3 py-2 px-3 rounded ${style.nav_links}`}>Dasboard</li></Link>
                    <Link to={'/aboutme'} className='text-decoration-none text-white'><li className={`mt-3 py-2 px-3 rounded ${style.nav_links}`}>AboutMe</li></Link>
                    <Link to={'/projects'} className='text-decoration-none text-white'><li className={`mt-3 py-2 px-3 rounded ${style.nav_links}`}>Projects</li></Link>
                    <Link to={'/experience'} className='text-decoration-none text-white'><li className={`mt-3 py-2 px-3 rounded ${style.nav_links}`}>Experience</li></Link>
                    <Link to={'/testmonial'} className='text-decoration-none text-white'><li className={`mt-3 py-2 px-3 rounded ${style.nav_links}`}>Testimonial</li></Link>
                    <Link to={'/contactme'} className='text-decoration-none text-white'><li className={`mt-3 py-2 px-3 rounded ${style.nav_links}`}>ContactMe</li></Link>
                </ul>
            </div>
            <div className="col-auto d-lg-flex d-none">
                <a href={`${process.env.REACT_APP_BASE_URL}assets/uploads/resumes/${userData[0].userResume}`} target='_blank' rel="noreferrer">
                    <button className={`py-2 px-3 rounded-5 ${style.button_color}`}>Resume</button>
                </a>
            </div>
            <div className="col-auto mt-2 d-lg-none d-flex ms-auto dropdown">
                <button className={`py-2 px-3 rounded-2 dropdown-toggle ${style.button_color}`} data-bs-toggle="dropdown" ><i className="bi bi-list"></i></button>
                <ul className={`dropdown-menu ${style.dropdown_color}`}>
                <Link to={'/'} className='text-decoration-none text-white'><li className={`py-1 px-3 rounded ${style.dropdown_item_color}`}>Dasboard</li></Link>
                    <Link to={'/aboutme'} className='text-decoration-none text-white'><li className={`py-1 px-3 rounded ${style.dropdown_item_color}`}>AboutMe</li></Link>
                    <Link to={'/projects'} className='text-decoration-none text-white'><li className={`py-1 px-3 rounded ${style.dropdown_item_color}`}>Projects</li></Link>
                    <Link to={'/experience'} className='text-decoration-none text-white'><li className={`py-1 px-3 rounded ${style.dropdown_item_color}`}>Experience</li></Link>
                    <Link to={'/testmonial'} className='text-decoration-none text-white'><li className={`py-1 px-3 rounded ${style.dropdown_item_color}`}>Testimonial</li></Link>
                    <Link to={'/contactme'} className='text-decoration-none text-white'><li className={`py-1 px-3 rounded ${style.dropdown_item_color}`}>ContactMe</li></Link>
                </ul>
            </div>
        </header>
    </>
  )
}

export default Header