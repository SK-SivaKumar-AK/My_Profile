import React , { useState , useRef, useEffect } from 'react'
import { toast } from 'react-toastify';

const Project = () => {

  const [render , setRender] = useState(false);

  const READPROJECT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readprojectinfo`;
  const [projectData , setProjectData] = useState([]);

  const ADDPROJECT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/addprojectinfo`;
  const [inputAddData , setInputAddData] = useState({projectName : '' , projectDescription : '' , projectEnable : false});
  const fileAddRef = useRef(null);

  const UPDATEPROJECT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/updateprojectinfo`;
  const [inputUpdateData , setInputUpdateData] = useState({_id : '' , projectName : '' , projectDescription : '' , projectEnable : false});
  const fileUpdateRef = useRef(null);

  const DELETEPROJECT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/deleteprojectinfo`;

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
    setInputUpdateData({_id : projectData[index]._id , projectName : projectData[index].projectName , projectDescription : projectData[index].projectDescription , projectEnable : projectData[index].projectEnable});
  }
  const handleReset = (e) => {
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
          <h4>History</h4>
          <table className="table table-bordered mb-5">
            <thead>
              <tr className='text-center'>
                <th>S.No</th>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Project Image</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                projectData && projectData.length > 0 ?

                projectData.map((item , index) => {
                  return (
                      <tr key={item._id}>
                        <td className='text-center'>{index + 1}</td>
                        <td>{item.projectName}</td>
                        <td>{item.projectDescription}</td>
                        <td className='text-center'><img src={`${process.env.REACT_APP_BASE_URL}assets/uploads/${item.projectImage}`} alt={item.projectImage} width={'50px'} height={'50px'} /></td>
                        <td className='text-center'><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => handleModalData(index)}>Edit</button></td>
                        <td className='text-center'><button type="button" className="btn btn-danger" onClick={ () => handleDelete(item._id)}>Delete</button></td>
                      </tr>
                  );
                })
                

                :

                <tr>
                  <td colSpan={6} className='text-center'>No Data Available</td>
                </tr>

              }
            </tbody>
          </table>
          <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">{inputUpdateData._id}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {handleReset()}}></button>
                </div>
                <div className="modal-body">
                  <div className="mt-3">
                    <label htmlFor="updateProjectName" className="form-label">Main Content</label>
                    <input type="text" className="form-control" id="updateProjectName" name="projectName" value={inputUpdateData.projectName} onChange={(e) => {handleUpdateChange(e)}}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updateProjectDescription" className="form-label">Sub Content</label>
                    <textarea className="form-control" id="updateProjectDescription" name="projectDescription" rows="3" value={inputUpdateData.projectDescription}  onChange={(e) => {handleUpdateChange(e)}}></textarea>
                  </div>
                  <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="updateProjectEnable" name="projectEnable" checked={inputUpdateData.projectEnable} onChange={ (e) => handleUpdateChange(e)}/>
                    <label className="form-check-label" htmlFor="updateProjectEnable">Enable the Project In Portfolio</label>
                  </div>
                  <div className="mt-3">
                    <label className="form-label text-dark" htmlFor="image">User Picture</label>
                    <input type="file" className="form-control" id="image" name="image" ref={fileUpdateRef}  onChange={(e) => {handleUpdateChange(e)}}/>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={(e) => {handleUpdate(e)}}>Update Dashboard Info</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project