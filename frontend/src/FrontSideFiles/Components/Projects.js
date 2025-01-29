import React , { useEffect, useState } from 'react'
import { useOutletContext , Link } from 'react-router-dom'
import style from '../CSSFiles/Projects.module.css'

const Projects = () => {

    const { userData } = useOutletContext();
    const [loading , setLoading] = useState(true);

    const GETPROJECTFRONT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readprojectinfofront`;
    const [projectData , setProjectData] = useState([]);

    useEffect(() => {
        const getSkillDetails = async () => {
            const response = await fetch(`${GETPROJECTFRONT_URL}/${userData[0]._id}`);
            const responded = await response.json();
            if(responded.Result === true){
                setProjectData(responded.data);
                setLoading(false);
            }
        }
        getSkillDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

  return (
    <>
      {
        loading ?
        <div className="row vh-100 d-flex justify-content-center align-items-center">
            <div className="col-4">
                <h1 className="text-center">&nbsp;</h1>
            </div>
        </div>

        :

        <>
            <div className="col-12 text-white mt-5">
                <div className="row text-center">
                    <div className="col">
                        <h3 className='ms-4 fs-1'><b>My Projects</b></h3>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="row px-5 d-flex justify-content-center">
                    {
                        projectData.map((item) => {
                            return(
                                <Link to={`/projects/${item._id}`} className="col-lg-3 col-md-6 col-12 mt-4 text-decoration-none" key={item._id}>
                                    <div className={`border rounded-3 p-2 text-center ${style.project_div}`}>
                                        <img className='mt-2' src={`${process.env.REACT_APP_BASE_URL}assets/uploads/images/${item.projectImage}`} alt="skillImage" width={'200px'} height={'200px'}/>
                                        <h4 className='text-white mt-3'>{item.projectName}</h4>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
      }
    </>
  )
}

export default Projects