import React , { useState , useRef } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const AdminRegisterPage = () => {

    const navigate = useNavigate();

    const SIGNIN_URL = `${process.env.REACT_APP_BASE_URL}api/v1/signin`;
    const [inputData , setInputData] = useState({userName : '' , userEmail : '' , userPassword : ''});
    const fileInputRef = useRef(null);
    

    const handleChange = (e) => {
        const { name , value , type , files , checked } = e.target;
        if(type === 'file'){
            setInputData({ ...inputData , [name] : files[0] });
        }else if(type === 'checkbox'){
            setInputData({ ...inputData , [name] : checked });
        }else{
            setInputData({ ...inputData , [name] : value });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for(let key in inputData){
            formData.append(key , inputData[key]);
        }

        const response = await fetch( SIGNIN_URL , {
            method: 'POST',
            body: formData,
        });
        const responded = await response.json();
        
        if(responded.Result === true){
            setInputData({ userName: '', userEmail: '', userPassword: ''});
            fileInputRef.current.value = '';
            toast.success( responded.Message, {
                position : 'top-center',
                onClose: () => {
                    navigate('/admin/entry/login');
                }
            });
        }else {
            toast.error(responded.Message || 'Something went wrong! Please try again.', {
                position: 'top-center'
            });
        }
    }

  return (
    <>
        <section className='container-fluid'>
        
            <div className="row vh-100 d-flex justify-content-center align-items-center ">

                <div className="col-4 rounded text-bg-secondary p-3">
                    <h2 className="text-center">Admin Register</h2>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">UserName</label>
                        <input type="text" className="form-control" id="userName" name="userName" placeholder="Please Enter User Name" autoComplete="off" value={inputData.userName} onChange={ (e) => handleChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userEmail" className="form-label">UserEmail</label>
                        <input type="text" className="form-control" id="userEmail" name="userEmail" placeholder="Please Enter User Email" value={inputData.userEmail} onChange={ (e) => handleChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">UserPassword</label>
                        <input type="text" className="form-control" id="userPassword" name="userPassword" placeholder="Please Enter User Password" value={inputData.userPassword} onChange={ (e) => handleChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="image">User Profile Picture</label>
                        <input type="file" className="form-control" id="image" name="image" onChange={ (e) => handleChange(e)} ref={fileInputRef}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="resume">User Resume</label>
                        <input type="file" className="form-control" id="resume" name="resume" onChange={ (e) => handleChange(e)} ref={fileInputRef}/>
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>Register</button>
                        <Link to={'/admin/entry/login'} className='btn text-light text-decoration-underline'>Already Register</Link>
                    </div>
                </div>

            </div>

        </section>
    </>
  )
}

export default AdminRegisterPage