import React , { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleProject = () => {

    const { id } = useParams();
    const [loading , setLoading] = useState(true);
    
    const GETSINGLEPROJECTFRONT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readsingleprojectinfofront`;
    const [singleprojectData , setSingleProjectData] = useState([]);

    useEffect(() => {
        const getSingleProjectDetails = async () => {
            const response = await fetch(`${GETSINGLEPROJECTFRONT_URL}/${id}`);
            const responded = await response.json();
            if(responded.Result === true){
                setSingleProjectData(responded.data);
                setLoading(false);
            }
        }
        getSingleProjectDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

  return (
    <>
        {
            loading ?

            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-4">
                    <h1 className="text-center">&nbsp;</h1>
                </div>
            </div>

            :

            <div className="col-12 text-white mt-5">
                <div className="row">
                    <div className="col">
                        <h3 className='ms-4 fs-1 text-center text-sm-start'><b>{singleprojectData[0].projectName}</b></h3>
                        <img className='ms-5 mt-2' src={`${process.env.REACT_APP_BASE_URL}assets/uploads/images/${singleprojectData[0].projectImage}`} alt="skillImage" width={'250px'} height={'250px'}/>
                        <p className='px-5 mt-4 fs-5'>{singleprojectData[0].projectDescription}</p>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default SingleProject