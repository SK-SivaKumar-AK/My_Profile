import React , { useState , useRef , useEffect } from 'react'
import { toast } from "react-toastify";
import AboutMeTable from './Tables/AboutMeTable';
import AboutMeModal from './Modals/AboutMeModal';

const AboutMe = () => {

  const [render , setRender] = useState(false);
  const modalRef = useRef(null);

  const READABOUT_URL = `${process.env.REACT_APP_BASE_URL}/readaboutinfo`;
  const [aboutData , setAboutData] = useState([]);

  const ADDABOUT_URL = `${process.env.REACT_APP_BASE_URL}/addaboutinfo`;
  const [inputAddData , setinputAddData] = useState({skillName : '' , skillEnable : false});
  const fileAddRef = useRef(null);

  const UPDATEABOUT_URL = `${process.env.REACT_APP_BASE_URL}/updateaboutinfo`;
  const [inputUpdateData , setinputUpdateData] = useState({_id : '' , skillName : '' , skillEnable : false});
  const fileUpdateRef = useRef(null);

  const DELETEABOUT_URL = `${process.env.REACT_APP_BASE_URL}/deleteaboutinfo`;


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
          <AboutMeTable aboutData={aboutData} handleModalData={handleModalData} handleDelete={handleDelete} />
        </div>
      </div>
      <AboutMeModal inputUpdateData={inputUpdateData} handleUpdateChange={handleUpdateChange} handleUpdate={handleUpdate} handleReset={handleReset} fileUpdateRef={fileUpdateRef} modalRef={modalRef}/>
    </>
  )
}

export default AboutMe