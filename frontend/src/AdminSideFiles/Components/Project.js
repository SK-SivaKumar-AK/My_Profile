import React , { useState , useRef, useEffect } from 'react'
import { toast } from 'react-toastify';
import ProjectTable from './Tables/ProjectTable';
import ProjectModal from './Modals/ProjectModal';

const Project = () => {

  const [render , setRender] = useState(false);
  const modalRef = useRef(null);

  const READPROJECT_URL = `${process.env.REACT_APP_BASE_URL}/readprojectinfo`;
  const [projectData , setProjectData] = useState([]);

  const ADDPROJECT_URL = `${process.env.REACT_APP_BASE_URL}/addprojectinfo`;
  const [inputAddData , setInputAddData] = useState({projectName : '' , projectDescription : '' , projectEnable : false});
  const fileAddRef = useRef(null);

  const UPDATEPROJECT_URL = `${process.env.REACT_APP_BASE_URL}/updateprojectinfo`;
  const [inputUpdateData , setInputUpdateData] = useState({_id : '' , projectName : '' , projectDescription : '' , projectEnable : false});
  const fileUpdateRef = useRef(null);

  const DELETEPROJECT_URL = `${process.env.REACT_APP_BASE_URL}/deleteprojectinfo`;

  useEffect(() => {
    const getProjectData = async () => {
      const response = await fetch(READPROJECT_URL , {
        method : 'GET',
        credentials : 'include'
      });
      const responded = await response.json();
      if(responded.Result === true){
        setProjectData(responded.data);
      }
    }
    getProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [render]);


  const handleAddChange = (e) => {
    const { name , value , type , files , checked } = e.target;
    if(type === 'file'){
      setInputAddData({...inputAddData , [name] : files[0]});
    }else if(type === 'checkbox'){
      setInputAddData({...inputAddData , [name] : checked});
    }else{
      setInputAddData({...inputAddData , [name] : value});
    }
  }
  const handleAdd = async (e) => {
    e.preventDefault();

    const addFormData = new FormData();
    for(let key in inputAddData){
      addFormData.append(key , inputAddData[key]);
    }
    
    const response = await fetch(ADDPROJECT_URL , {
      method : 'POST',
      body : addFormData,
      credentials : 'include'
    });
    const responded = await response.json();
    if(responded.Result === true){
      setRender(!render);
      setInputAddData({projectName : '' , projectDescription : '' , projectEnable : ''});
      fileAddRef.current.value = '';
      toast.success(responded.Message , {
        position : 'top-center'
      });
    }else{
      toast.error(responded.Message || 'Something Went Wrong! Try Again.' , {
        position : 'top-center'
      });
    }
  }


  const handleModalData = (index) => {
    modalRef.current.blur();
    setInputUpdateData({_id : projectData[index]._id , projectName : projectData[index].projectName , projectDescription : projectData[index].projectDescription , projectEnable : projectData[index].projectEnable});
  }
  const handleReset = (e) => {
    modalRef.current.blur();
    setInputUpdateData({_id : '' , projectName : '' , projectDescription : '' , projectEnable : false});
    fileUpdateRef.current.value = '';
  }
  const handleUpdateChange = (e) => {
    const { name , value , type , files , checked } = e.target;
    if(type === 'file'){
      setInputUpdateData({...inputUpdateData , [name] : files[0]});
    }else if(type === 'checkbox'){
      setInputUpdateData({...inputUpdateData , [name] : checked});
    }else{
      setInputUpdateData({...inputUpdateData , [name] : value});
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateFormData = new FormData();
    for(let key in inputUpdateData){
      updateFormData.append(key , inputUpdateData[key]);
    }

    const response = await fetch(`${UPDATEPROJECT_URL}/${inputUpdateData._id}` , {
      method : 'POST',
      body : updateFormData,
      credentials : 'include'
    });
    const responded = await response.json();
    if(responded.Result === true){
      setRender(!render);
      toast.success(responded.Message , {
        position : 'top-center'
      });
    }else{
      toast.success( responded.Message || 'Something went wrong! Please try again.', {
          position : 'top-center',
      });
    }
  }


  const handleDelete = async (Id) =>{
    const response = await fetch(`${DELETEPROJECT_URL}/${Id}` , {
      method: 'DELETE',
      credentials: 'include',
    });
    const responded = await response.json();
    if(responded.Result === true){
      setRender(!render);
      toast.success( responded.Message, {
          position : 'top-center',
      });
      
    }else{
      toast.success( responded.Message || 'Something went wrong! Please try again.', {
          position : 'top-center',
      });
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2>Projects</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="mt-3">
            <label htmlFor="projectName" className="form-label">Project Name</label>
            <input type="text" className="form-control" id="projectName" name="projectName" placeholder="Please Enter Project Name" value={inputAddData.projectName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="projectDescription" className="form-label">Project Description</label>
            <textarea className="form-control" id="projectDescription" name="projectDescription" rows="3" placeholder="Please Enter Project Description" value={inputAddData.projectDescription} onChange={ (e) => handleAddChange(e)}></textarea>
          </div>
          <div className="mt-3">
            <label className="form-label text-dark" htmlFor="image">Project Image</label>
            <input type="file" className="form-control" id="image" name="image" ref={fileAddRef} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="form-check form-switch mt-3">
            <input className="form-check-input" type="checkbox" role="switch" id="projectEnable" name="projectEnable" checked={inputAddData.projectEnable}  onChange={ (e) => handleAddChange(e)}/>
            <label className="form-check-label" htmlFor="projectEnable">Enable the Project In Portfolio</label>
          </div>
          <div className="mt-3">
            <button type="button" className="btn btn-primary" onClick={ (e) => handleAdd(e)}>Save Project Info</button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <ProjectTable projectData={projectData} handleModalData={handleModalData} handleDelete={handleDelete}/>
        </div>
      </div>
      <ProjectModal inputUpdateData={inputUpdateData} handleUpdateChange={handleUpdateChange} handleUpdate={handleUpdate} handleReset={handleReset} fileUpdateRef={fileUpdateRef} modalRef={modalRef}/>
    </>
  )
}

export default Project