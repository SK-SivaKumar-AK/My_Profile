import React , { useState , useEffect } from 'react'
import { useNavigate , Outlet } from 'react-router-dom'

const AdminEntryPage = () => {

    const GETUSER_URL = `${process.env.REACT_APP_BASE_URL}/getuser`;
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(GETUSER_URL , {
                method: 'GET',
                credentials: 'include', // Ensure cookies are sent
            });
            const responded = await response.json();
            
            if(responded.Result === true){
                navigate('/admin/entered/dashboard');
            }
            setLoading(false);
        }
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);


  return (
    <>
        {
            loading ? 

            <section className="container-fluid vh-100 text-bg-light">
                <div className="row vh-100 d-flex justify-content-center align-items-center">
                    <div className="col-4">
                        <h1 className="text-center">Loading...</h1>
                    </div>
                </div>
            </section>

            :

            <Outlet />
        }
    </>
  )
}

export default AdminEntryPage