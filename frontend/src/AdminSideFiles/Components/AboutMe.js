import React , { useState , useRef , useEffect } from 'react'
import { toast } from "react-toastify";

const AboutMe = () => {

  const [render , setRender] = useState(false);
  const modalRef = useRef(null);

  const READABOUT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readaboutinfo`;
  const [aboutData , setAboutData] = useState([]);

  const ADDABOUT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/addaboutinfo`;
  const [inputAddData , setinputAddData] = useState({skillName : '' , skillEnable : false});
  const fileAddRef = useRef(null);

  const UPDATEABOUT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/updateaboutinfo`;
  const [inputUpdateData , setinputUpdateData] = useState({_id : '' , skillName : '' , skillEnable : false});
  const fileUpdateRef = useRef(null);

  const DELETEABOUT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/deleteaboutinfo`;


  useEffect(()=>{
    const getAboutData = async () => {
      const response = await fetch(READABOUT_URL , {
        method : 'GET',
        credentials : 'include'
      });
      const responded = await response.json();
      if(responded.Result === true){
        setAboutData(responded.data);
      }
    }
    getAboutData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [render]);


  const handleAddChange = (e) => {
    const { name , value , type , files , checked } = e.target;
    if(type === 'file'){
      setinputAddData({ ...inputAddData , [name] : files[0] });
    }else if(type === 'checkbox'){
      setinputAddData({ ...inputAddData , [name] : checked });
    }else{
      setinputAddData({ ...inputAddData , [name] : value });
    }
  }
  const handleAdd = async (e) => {
    e.preventDefault();

    const addFormData = new FormData();
    for(let key in inputAddData){
      addFormData.append(key , inputAddData[key]);
    }
    const response = await fetch( ADDABOUT_URL , {
        method: 'POST',
        body: addFormData,
        credentials: 'include',
    });
    const responded = await response.json();
    if(responded.Result === true){
      setRender(!render);
      setinputAddData({skillName : '' , skillEnable : false});
      fileAddRef.current.value = '';
      toast.success( responded.Message, {
          position : 'top-center',
      });
      
    }else{
      toast.success( responded.Message || 'Something went wrong! Please try again.', {
          position : 'top-center',
      });
    }
    
  }


  const handleModalData = (index) => {
    modalRef.current.blur();
    setinputUpdateData({_id : aboutData[index]._id , skillName : aboutData[index].skillName , skillEnable : aboutData[index].skillEnable });
  }
  const handleReset = ()=>{
    modalRef.current.blur();
    setinputUpdateData({_id : '' , skillName : '' , skillEnable : false});
    fileUpdateRef.current.value = '';
  }

  const handleUpdateChange = (e) => {
    const { name , value , type , checked , files } = e.target;
    if(type === 'file'){
      setinputUpdateData({ ...inputUpdateData , [name] : files[0] });
    }else if(type === 'checkbox'){
      setinputUpdateData({ ...inputUpdateData , [name] : checked });
    }else{
      setinputUpdateData({ ...inputUpdateData , [name] : value });
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateFormData = new FormData();
    for(let key in inputUpdateData){
      updateFormData.append(key , inputUpdateData[key]);
    }

    const response = await fetch( `${UPDATEABOUT_URL}/${inputUpdateData._id}` , {
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
      toast.success( responded.Message || 'Something went wrong! Please try again.', {
          position : 'top-center',
      });
    }
  }

  const handleDelete = async (Id) => {
      const response = await fetch( `${DELETEABOUT_URL}/${Id}` , {
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
          <h2>About Me</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="mt-3">
            <label htmlFor="skillName" className="form-label">Skill Name</label>
            <input type="text" className="form-control" id="skillName" name="skillName" placeholder="Please Enter Skill Name" value={inputAddData.skillName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label className="form-label text-dark" htmlFor="image">User Picture</label>
            <input type="file" className="form-control" id="image" name="image" ref={fileAddRef} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="form-check form-switch mt-3">
            <input className="form-check-input" type="checkbox" role="switch" id="skillEnable" name="skillEnable" checked={inputAddData.skillEnable}  onChange={ (e) => handleAddChange(e)}/>
            <label className="form-check-label" htmlFor="skillEnable">Enable the Skill In Portfolio</label>
          </div>
          <div className="mt-3">
            <button type="button" className="btn btn-primary" onClick={ (e) => handleAdd(e)}>Save AboutMe Info</button>
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
                <th>Skill Names</th>
                <th>Skill Image</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                aboutData && aboutData.length > 0 ?

                aboutData.map((item , index) => {
                  return (
                      <tr key={item._id}>
                        <td className='text-center'>{index + 1}</td>
                        <td>{item.skillName}</td>
                        <td className='text-center'><img src={`${process.env.REACT_APP_BASE_URL}assets/uploads/${item.skillImage}`} alt={item.skillImage} width={'50px'} height={'50px'} /></td>
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
                    <label htmlFor="updateSkillName" className="form-label">Main Content</label>
                    <input type="text" className="form-control" id="updateSkillName" name="skillName" value={inputUpdateData.skillName} onChange={(e) => {handleUpdateChange(e)}}/>
                  </div>
                  <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="updateSkillEnable" name="skillEnable" checked={inputUpdateData.skillEnable} onChange={ (e) => handleUpdateChange(e)}/>
                    <label className="form-check-label" htmlFor="updateSkillEnable">Enable the Skill In Portfolio</label>
                  </div>
                  <div className="mt-3">
                    <label className="form-label text-dark" htmlFor="image">User Picture</label>
                    <input type="file" className="form-control" id="image" name="image" ref={fileUpdateRef}  onChange={(e) => {handleUpdateChange(e)}}/>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={(e) => {handleUpdate(e)}}>Update AboutMe Info</button>
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

export default AboutMe