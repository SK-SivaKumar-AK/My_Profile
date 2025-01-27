import React , { useState , useEffect } from 'react'
import { useNavigate , Outlet , Link } from 'react-router-dom'
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const AdminMainPage = () => {

    const [loading, setLoading] = useState(true);
    const [render , setRender] = useState(false);
    const navigate = useNavigate();
    

    const GETUSER_URL = `${process.env.REACT_APP_BASE_URL}api/v1/getuser`;
    const [userData , setUserData] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(GETUSER_URL , {
                method : 'GET',
                credentials : 'include'
            });
            const responded = await response.json();
            if(responded.Result === true){
                setUserData(responded.data);
                setLoading(false);
            }else{
                navigate('/admin/login');
            }
        }
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [render]);

    
  return (
    <>
        {
            loading ?  

            <section className="container-fluid vh-100 text-bg-dark">
                <div className="row vh-100 d-flex justify-content-center align-items-center">
                    <div className="col-4">
                        <h1 className="text-center">Loading...</h1>
                    </div>
                </div>
            </section>

            : 
            
            <section className="container-fluid vh-100 text-bg-dark">

                  
                <Header userData={userData} render={render} setRender={setRender}/>           
                
                <main className="row">
    
                    <div className="col-3 d-md-flex d-none bg-dark-subtle vh-100 position-fixed">
                        <ul className="list-unstyled ms-2 text-dark">
                            <Link to={'/admin/dashboard'} className="text-black text-decoration-none"><li className="fs-4 mt-4"><i className="bi bi-front"></i><span className="ms-3">Dashboard</span></li></Link>
                            <Link to={'/admin/aboutme'} className="text-black text-decoration-none"><li className="fs-4 mt-4"><i className="bi bi-file-person"></i><span className="ms-3">About Me</span></li></Link>
                            <Link to={'/admin/projects'} className="text-black text-decoration-none"><li className="fs-4 mt-4"><i className="bi bi-pc-display"></i><span className="ms-3">Projects</span></li></Link>
                            <Link to={'/admin/experience'} className="text-black text-decoration-none"><li className="fs-4 mt-4"><i className="bi bi-building-check"></i><span className="ms-3">Experience</span></li></Link>
                            <Link to={'/admin/testmonial'} className="text-black text-decoration-none"><li className="fs-4 mt-4"><i className="bi bi-award"></i><span className="ms-3">Testmonial</span></li></Link>
                            <Link to={'/admin/contactme'} className="text-black text-decoration-none"><li className="fs-4 mt-4"><i className="bi bi-person-lines-fill"></i><span className="ms-3">Contact Me</span></li></Link>
                        </ul>
                    </div>
                    <div className="col-12 col-md-9 text-bg-light vh-100 ms-auto">
                        <Outlet />
                    </div>
    
                </main>
    
                <Footer />


                
            </section>
        }
        
    </>
  )
}

export default AdminMainPage