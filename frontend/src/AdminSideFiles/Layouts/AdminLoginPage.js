import React , { useState , useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'

const AdminLoginPage = () => {

    const LOGIN_URL = `${process.env.REACT_APP_BASE_URL}api/v1/login`;
    const GETUSER_URL = `${process.env.REACT_APP_BASE_URL}api/v1/getuser`;
    const [inputData , setInputData] = useState({
        userEmail : '',
        userPassword : ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name , value } = e.target;
        setInputData({ ...inputData , [name] : value });
    }

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(GETUSER_URL , {
                method: 'GET',
                credentials: 'include', // Ensure cookies are sent
                });
            const responded = await response.json();
            
            if(responded.Result === true){
                navigate('/admin/dashboard');
            }
        }
        getUser();
    } , [GETUSER_URL]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for(let key in inputData){
            formData.append(key , inputData[key]);
        }

        const response = await fetch( LOGIN_URL , {
            method : "POST",
            body : formData,
            credentials: 'include',
        });
        const responded = await response.json();
        if(responded.Result === true){
            navigate('/admin/dashboard');
        }
    }


  return (
    <>
        <section className='container-fluid'>

            <div className="row vh-100 d-flex justify-content-center align-items-center ">

                <div className="col-4 rounded text-bg-secondary p-3">
                    <h2 className="text-center">Admin Login</h2>
                    <div className="mb-3">
                        <label htmlFor="userEmail" className="form-label">UserEmail</label>
                        <input type="text" className="form-control" id="userEmail" name="userEmail" placeholder="Please Enter User Email" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">UserPassword</label>
                        <input type="text" className="form-control" id="userPassword" name="userPassword" placeholder="Please Enter User Password" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>LogIn</button>
                        <Link to={'/admin/register'} className='btn text-light text-decoration-underline'>Account Create</Link>
                    </div>
                </div>

            </div>

        </section>
    </>
  )
}

export default AdminLoginPage