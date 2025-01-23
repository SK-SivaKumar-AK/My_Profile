import React , { useState , useEffect } from 'react'
import { useNavigate , Outlet , Link } from 'react-router-dom'

const AdminMainPage = () => {

    const GETUSER_URL = `${process.env.REACT_APP_BASE_URL}api/v1/getuser`;
    const LOGOUT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/logout`;
    const [userData , setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(GETUSER_URL , {
                method : 'GET',
                credentials : 'include'
            });
            const responded = await response.json();
            if(responded.Result === true){
                setUserData(responded.data[0]);
                setLoading(false);
            }else{
                navigate('/admin/login');
            }
        }
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    const handleLogout = async () => {
        const response = await fetch(LOGOUT_URL , {
            method : 'GET',
            credentials : 'include'
        });
        const responded = await response.json();
        if(responded.Result === true){
            navigate('/admin/login');
        }
    }


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

                <header className="row text-bg-secondary p-1 sticky-top">
    
                    <div className="col-1 d-flex d-md-none align-items-center dropdown">
                        <button className="btn btn-lg btn-secondary  dropdown-toggle" data-bs-toggle="dropdown" ><i className="bi bi-list"></i></button>
                        <ul className="dropdown-menu">
                            <Link to={'/admin/dashboard'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-front"></i><span className="ms-3">Dashboard</span></li></Link>
                            <Link to={'/admin/aboutme'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-file-person"></i><span className="ms-3">About Me</span></li></Link>
                            <Link to={'/admin/projects'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-pc-display"></i><span className="ms-3">Projects</span></li></Link>
                            <Link to={'/admin/experience'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-building-check"></i><span className="ms-3">Experience</span></li></Link>
                            <Link to={'/admin/testmonial'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-award"></i><span className="ms-3">Testmonial</span></li></Link>
                            <Link to={'/admin/contactme'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-person-lines-fill"></i><span className="ms-3">Contact Me</span></li></Link>
                        </ul>
                    </div>
                    <div className="col-9 d-md-flex d-none align-items-center">
                        <h5>{userData.userName}</h5>
                    </div>
                    <div className="col-auto ms-auto dropdown">
                        <img src={`${process.env.REACT_APP_BASE_URL}assets/uploads/${userData.userProfileImage}`} alt={userData.userProfileImage} className="dropdown-toggle rounded-circle" data-bs-toggle="dropdown" width={'50px'} height={'50px'}/>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={(e) => {handleLogout()}}>LogOut</button></li>
                        </ul>
                    </div>
    
                </header>
    
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
    
                <footer className="row text-bg-secondary pt-2 fixed-bottom">
                    <div className="col d-flex align-items-center">
                        <h5>Portfolio Admin</h5>
                    </div>
                </footer>
    
            </section>
        }
    </>
  )
}

export default AdminMainPage