import React , { useState , useEffect , useRef } from 'react'
import { useNavigate , Outlet , Link } from 'react-router-dom'
import { toast } from "react-toastify";

const AdminMainPage = () => {

    const [loading, setLoading] = useState(true);
    const [render , setRender] = useState(false);
    const navigate = useNavigate();
    const modalRef = useRef(null);
    

    const GETUSER_URL = `${process.env.REACT_APP_BASE_URL}api/v1/getuser`;
    const [userData , setUserData] = useState({});

    const UPDATEUSER_URL = `${process.env.REACT_APP_BASE_URL}api/v1/userinfoupdate`;
    const [inputUpdateData , setInputUpdateData] = useState({_id : '' , userName : '' , userEmail : ''});
    const fileUpdateRef = useRef(null);
    

    const LOGOUT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/logout`;

    

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



    const handleModalData = (index) => {
        modalRef.current.blur();
        setInputUpdateData({_id : userData[index]._id , userName : userData[index].userName , userEmail : userData[index].userEmail});
    }
    const handleReset = ()=>{
        modalRef.current.blur();
        setInputUpdateData({_id : '' , userName : '' , userEmail : ''});
        fileUpdateRef.current.value = '';
    }

    const handleUpdateChange = (e) => {
        e.preventDefault();
        const { name , value , type , files } = e.target;
        if(type === 'file'){
            setInputUpdateData({ ...inputUpdateData , [name] : files[0] });
        }else{
            setInputUpdateData({ ...inputUpdateData , [name] : value });
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault();

        const updateFormData = new FormData();
        for(let key in inputUpdateData){
            updateFormData.append(key , inputUpdateData[key]);
        }
        const response = await fetch( `${UPDATEUSER_URL}/${inputUpdateData._id}` , {
            method: 'POST',
            body: updateFormData,
            credentials: 'include',
        });
        const responded = await response.json();
        if(responded.Result === true){
            setRender(!render);
            toast.success( responded.Message, {
                position : 'top-center',
            });
        }else{
            toast.error('Something went wrong! Please try again.', {
                position: 'top-center'
            });
        }
    }


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
                        <h5>{userData[0].userName}</h5>
                    </div>
                    <div className="col-auto ms-auto dropdown">
                        <img src={`${process.env.REACT_APP_BASE_URL}assets/uploads/${userData[0].userProfileImage}`} alt={userData[0].userProfileImage} className="dropdown-toggle rounded-circle" data-bs-toggle="dropdown" width={'50px'} height={'50px'}/>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={(e) => {handleLogout(e)}}>LogOut</button></li>
                            <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#userUpdateModal" onClick={() => handleModalData(0)}>Update Profile</button></li>
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
    
                <footer className="row text-bg-secondary pt-1 fixed-bottom">
                    <div className="col d-flex align-items-center">
                        <h5>Portfolio Admin</h5>
                    </div>
                </footer>


                <div className="modal fade" id="userUpdateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">{userData[0].userName}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef} onClick={() => {handleReset()}}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="updateUserName" className="form-label text-dark">UserName</label>
                                    <input type="text" className="form-control" id="updateUserName" name="userName" placeholder="Please Enter User Name" value={inputUpdateData.userName} autoComplete="off" onChange={ (e) => handleUpdateChange(e)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="updateUserEmail" className="form-label text-dark">UserEmail</label>
                                    <input type="text" className="form-control" id="updateUserEmail" name="userEmail" placeholder="Please Enter User Email" value={inputUpdateData.userEmail} onChange={ (e) => handleUpdateChange(e)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="updateUserPassword" className="form-label text-dark">UserPassword</label>
                                    <input type="password" className="form-control" id="updateUserPassword" name="userPassword" placeholder="*****" onChange={ (e) => handleUpdateChange(e)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-dark" htmlFor="updateImage">User Profile Picture</label>
                                    <input type="file" className="form-control" id="updateImage" name="image" ref={fileUpdateRef} onChange={ (e) => handleUpdateChange(e)} />
                                </div>
                                
                                <hr />
                                
                                <button type="button" className="btn btn-primary" onClick={ (e) => handleUpdate(e)}>Update Info</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        }
        
    </>
  )
}

export default AdminMainPage