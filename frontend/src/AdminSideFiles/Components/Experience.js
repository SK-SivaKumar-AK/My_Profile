import React , { useState , useEffect , useRef } from 'react'
import { toast } from 'react-toastify';

const Experience = () => {

  const [render , setRender] = useState(false);
  const modalRef = useRef(null);

  const READEXPERIENCE_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readexperienceinfo`;
  const [experienceData , setExperienceData] = useState([]);

  const ADDEXPERIENCE_URL = `${process.env.REACT_APP_BASE_URL}api/v1/addexperienceinfo`;
  const [inputAddData , setInputAddData] = useState({roleName : '' , roleDescription : '' , year : '' , companyName : '' , companyLocation : '' , experienceEnable : ''});

  const UPDATEEXPERIENCE_URL = `${process.env.REACT_APP_BASE_URL}api/v1/updateexperienceinfo`;
  const [inputUpdateData , setInputUpdateData] = useState({_id : '' , roleName : '' , roleDescription : '' , year : '' , companyName : '' , companyLocation : '' , experienceEnable : ''});
    
  const DELETEEXPERIENCE_URL = `${process.env.REACT_APP_BASE_URL}api/v1/deleteexperienceinfo`;


  useEffect(() => {
    const getExperienceData = async () => {
      const response = await fetch(READEXPERIENCE_URL , {
        method : 'GET',
        credentials : 'include'
      });
      const responded = await response.json();
      if(responded.Result === true){
        setExperienceData(responded.data);
      }
    }
    getExperienceData();
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
    
    const response = await fetch(ADDEXPERIENCE_URL , {
      method : 'POST',
      body : addFormData,
      credentials : 'include'
    });
    const responded = await response.json();
    if(responded.Result === true){
      setRender(!render);
      setInputAddData({roleName : '' , roleDescription : '' , year : "" , companyName : '' , companyLocation : '' , experienceEnable : ''});
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
    setInputUpdateData({_id : experienceData[index]._id , roleName : experienceData[index].roleName , roleDescription : experienceData[index].roleDescription , year : experienceData[index].year , companyName : experienceData[index].companyName , companyLocation : experienceData[index].companyLocation , experienceEnable : experienceData[index].experienceEnable});
  }
  const handleReset = (e) => {
    modalRef.current.blur();
    setInputUpdateData({_id : '' , roleName : '' , roleDescription : '' , year : '' , companyName : '' , companyLocation : '' , experienceEnable : ''});
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

    const response = await fetch(`${UPDATEEXPERIENCE_URL}/${inputUpdateData._id}` , {
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
    const response = await fetch(`${DELETEEXPERIENCE_URL}/${Id}` , {
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
          <h2>Experience</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="mt-3">
            <label htmlFor="roleName" className="form-label">Role Name</label>
            <input type="text" className="form-control" id="roleName" name="roleName" placeholder="Please Enter Role Name" value={inputAddData.roleName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="roleDescription" className="form-label">Role Description</label>
            <textarea className="form-control" id="roleDescription" name="roleDescription" rows="3" placeholder="Please Enter Role Description" value={inputAddData.roleDescription} onChange={ (e) => handleAddChange(e)}></textarea>
          </div>
          <div className="mt-3">
            <label className="form-label text-dark" htmlFor="year">Year</label>
            <select className="form-select" aria-label="Default select" id="year" name="year" value={inputAddData.year} onChange={ (e) => handleAddChange(e)}>
              <option value="">Please Select year</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div className="mt-3">
            <label htmlFor="companyName" className="form-label">Company Name</label>
            <input type="text" className="form-control" id="companyName" name="companyName" placeholder="Please Enter Company Name" value={inputAddData.companyName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="companyLocation" className="form-label">Company Location</label>
            <input type="text" className="form-control" id="companyLocation" name="companyLocation" placeholder="Please Enter Company Location" value={inputAddData.companyLocation} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="form-check form-switch mt-3">
            <input className="form-check-input" type="checkbox" role="switch" id="experienceEnable" name="experienceEnable" checked={inputAddData.experienceEnable}  onChange={ (e) => handleAddChange(e)}/>
            <label className="form-check-label" htmlFor="experienceEnable">Enable the Experience In Portfolio</label>
          </div>
          <div className="mt-3">
            <button type="button" className="btn btn-primary" onClick={ (e) => handleAdd(e)}>Save Experience Info</button>
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
                <th>Role Name</th>
                <th>Role Description</th>
                <th>Year</th>
                <th>Company Name</th>
                <th>Company Location</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                experienceData && experienceData.length > 0 ?

                experienceData.map((item , index) => {
                  return (
                      <tr key={item._id}>
                        <td className='text-center'>{index + 1}</td>
                        <td>{item.roleName}</td>
                        <td>{item.roleDescription}</td>
                        <td>{item.year}</td>
                        <td>{item.companyName}</td>
                        <td>{item.companyLocation}</td>
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
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef} onClick={() => {handleReset()}}></button>
                </div>
                <div className="modal-body">
                  <div className="mt-3">
                    <label htmlFor="updateRoleName" className="form-label">Role Name</label>
                    <input type="text" className="form-control" id="updateRoleName" name="roleName" value={inputUpdateData.roleName} onChange={(e) => {handleUpdateChange(e)}}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updateRoleDescription" className="form-label">Role Description</label>
                    <textarea className="form-control" id="updateRoleDescription" name="roleDescription" rows="3" value={inputUpdateData.roleDescription}  onChange={(e) => {handleUpdateChange(e)}}></textarea>
                  </div>
                  <div className="mt-3">
                    <label className="form-label text-dark" htmlFor="updateYear">Year</label>
                    <select className="form-select" aria-label="Default select" id="updateYear" name="year" value={inputUpdateData.year} onChange={ (e) => handleUpdateChange(e)}>
                      <option value="">Open this select year</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updateCompanyName" className="form-label">Company Name</label>
                    <input type="text" className="form-control" id="updateCompanyName" name="companyName" placeholder="Please Enter Company Name" value={inputUpdateData.companyName} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updateCompanyLocation" className="form-label">Company Location</label>
                    <input type="text" className="form-control" id="updateCompanyLocation" name="companyLocation" placeholder="Please Enter Company Location" value={inputUpdateData.companyLocation} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="updateExperienceEnable" name="experienceEnable" checked={inputUpdateData.experienceEnable} onChange={ (e) => handleUpdateChange(e)}/>
                    <label className="form-check-label" htmlFor="updateExperienceEnable">Enable the Experience In Portfolio</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={(e) => {handleUpdate(e)}}>Update Experience Info</button>
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

export default Experience