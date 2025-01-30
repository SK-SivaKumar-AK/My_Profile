import React , { useRef , useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { toast } from "react-toastify";
import HeaderModal from './Modals/HeaderModal';

const Header = ({userData , render , setRender}) => {
    
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const UPDATEUSER_URL = `${process.env.REACT_APP_BASE_URL}api/v1/userinfoupdate`;
    const [inputUpdateData , setInputUpdateData] = useState({_id : '' , userName : '' , userEmail : '' , userPassword : '' , userEnable : false});
    const fileUpdateRef = useRef(null);

    const LOGOUT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/logout`;


    const handleModalData = (index) => {
        modalRef.current.blur();
        setInputUpdateData({_id : userData[index]._id , userName : userData[index].userName , userEmail : userData[index].userEmail , userPassword : '*****' , userEnable : userData[index].userEnable});
    }
    const handleReset = ()=>{
        modalRef.current.blur();
        setInputUpdateData({_id : '' , userName : '' , userEmail : '' , userPassword : '' , userEnable : false});
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
            navigate('/admin/entry/login');
        }
    }

    return (
        <>
            <header className="row text-bg-secondary p-1 sticky-top">
    
                <div className="col-1 d-flex d-md-none align-items-center dropdown">
                    <button className="btn btn-lg btn-secondary  dropdown-toggle" data-bs-toggle="dropdown" ><i className="bi bi-list"></i></button>
                    <ul className="dropdown-menu">
                        <Link to={'/admin/entered/dashboard'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-front"></i><span className="ms-3">Dashboard</span></li></Link>
                        <Link to={'/admin/entered/aboutme'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-file-person"></i><span className="ms-3">About Me</span></li></Link>
                        <Link to={'/admin/entered/projects'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-pc-display"></i><span className="ms-3">Projects</span></li></Link>
                        <Link to={'/admin/entered/experience'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-building-check"></i><span className="ms-3">Experience</span></li></Link>
                        <Link to={'/admin/entered/testmonial'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-award"></i><span className="ms-3">Testmonial</span></li></Link>
                        <Link to={'/admin/entered/contactme'} className="text-black text-decoration-none"><li className="dropdown-item"><i className="bi bi-person-lines-fill"></i><span className="ms-3">Contact Me</span></li></Link>
                    </ul>
                </div>
                <div className="col-9 d-md-flex d-none align-items-center">
                    <h5>{userData[0].userName}</h5>
                </div>
                <div className="col-auto ms-auto dropdown">
                    <img src={`${process.env.REACT_APP_BASE_URL}assets/uploads/images/${userData[0].userProfileImage}`} alt={userData[0].userProfileImage} className="dropdown-toggle rounded-circle" data-bs-toggle="dropdown" width={'50px'} height={'50px'}/>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={(e) => {handleLogout(e)}}>LogOut</button></li>
                        <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#userUpdateModal" onClick={() => handleModalData(0)}>Update Profile</button></li>
                    </ul>
                </div>
                    
            </header> 
            
            <HeaderModal userData={userData} inputUpdateData={inputUpdateData} handleUpdateChange={handleUpdateChange} handleUpdate={handleUpdate} handleReset={handleReset} fileUpdateRef={fileUpdateRef} modalRef={modalRef}/>
        </>
    )
}

export default Header