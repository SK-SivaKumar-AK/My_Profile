import React from 'react'
import { Outlet } from 'react-router-dom'
import style from '../CSSFiles/FrontMainPage.module.css'
import Header from '../Components/Header'

const FrontMainPage = ({userData , loading}) => {

  return (
    <>
        {
            loading ? 
            
            <section className={`container-fluid  ${style.container}`}>
                <div className="row vh-100 d-flex justify-content-center align-items-center">
                    <div className="col-4">
                        <h1 className={`text-center ${style.loading_text}`}>Loading...</h1>
                    </div>
                </div>
            </section>

            :

            <section className={`container-fluid  ${style.container}`}>
                <Header userData={userData}/>
                <main className='row'>
                    <Outlet context={{ userData }}/>
                </main>
            </section>
        }
    </>
  )
}

export default FrontMainPage