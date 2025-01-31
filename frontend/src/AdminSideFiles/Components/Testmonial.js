import React , { useState , useEffect , useRef } from 'react'
import { toast } from 'react-toastify';
import TestmonialTable from './Tables/TestmonialTable';
import TestmonialModal from './Modals/TestmonialModal';

const Testmonial = () => {

  const [render , setRender] = useState(false);
  const modalRef = useRef(null);

  const READTESTMONIAL_URL = `${process.env.REACT_APP_BASE_URL}/readtestmonialinfo`;
  const [testmonialData , setTestmonialData] = useState([]);

  const ADDTESTMONIAL_URL = `${process.env.REACT_APP_BASE_URL}/addtestmonialinfo`;
  const [inputAddData , setInputAddData] = useState({subject : '' , personName : '' , personRole : '' , testmonialEnable : false});
  
  const UPDATETESTMONIAL_URL = `${process.env.REACT_APP_BASE_URL}/updatetestmonialinfo`;
  const [inputUpdateData , setInputUpdateData] = useState({_id : '' , subject : '' , personName : '' , personRole : '' , testmonialEnable : false});
    
  const DELETETESTMONIAL_URL = `${process.env.REACT_APP_BASE_URL}/deletetestmonialinfo`;


  useEffect(() => {
    const getTestmonialData = async () => {
      const response = await fetch(READTESTMONIAL_URL , {
        method : 'GET',
        credentials : 'include'
      });
      const responded = await response.json();
      if(responded.Result === true){
        setTestmonialData(responded.data);
      }
    }
    getTestmonialData();
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
    
    const response = await fetch(ADDTESTMONIAL_URL , {
      method : 'POST',
      body : addFormData,
      credentials : 'include'
    });
    const responded = await response.json();
    if(responded.Result === true){
      setRender(!render);
      setInputAddData({subject : '' , personName : '' , personRole : '' , testmonialEnable : false});
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
    setInputUpdateData({_id : testmonialData[index]._id , subject : testmonialData[index].subject , personName : testmonialData[index].personName , personRole : testmonialData[index].personRole , testmonialEnable : testmonialData[index].testmonialEnable});
  }
  const handleReset = (e) => {
    modalRef.current.blur();
    setInputUpdateData({_id : '' , subject : '' , personName : '' , personRole : '' , testmonialEnable : false});
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

    const response = await fetch(`${UPDATETESTMONIAL_URL}/${inputUpdateData._id}` , {
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
    const response = await fetch(`${DELETETESTMONIAL_URL}/${Id}` , {
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
          <h2>Testmonial</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="mt-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input type="text" className="form-control" id="subject" name="subject" placeholder="Please Enter Subject" value={inputAddData.subject} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="personName" className="form-label">Person Name</label>
            <input type="text" className="form-control" id="personName" name="personName" placeholder="Please Enter Person Name" value={inputAddData.personName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="personRole" className="form-label">Person Role</label>
            <input type="text" className="form-control" id="personRole" name="personRole" placeholder="Please Enter Person Role" value={inputAddData.personRole} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="form-check form-switch mt-3">
            <input className="form-check-input" type="checkbox" role="switch" id="testmonialEnable" name="testmonialEnable" checked={inputAddData.testmonialEnable}  onChange={ (e) => handleAddChange(e)}/>
            <label className="form-check-label" htmlFor="testmonialEnable">Enable the Testmonial In Portfolio</label>
          </div>
          <div className="mt-3">
            <button type="button" className="btn btn-primary" onClick={ (e) => handleAdd(e)}>Save Testmonial Info</button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <TestmonialTable testmonialData={testmonialData} handleModalData={handleModalData} handleDelete={handleDelete}/>
        </div>
      </div>
      <TestmonialModal inputUpdateData={inputUpdateData} handleUpdateChange={handleUpdateChange} handleUpdate={handleUpdate} handleReset={handleReset} modalRef={modalRef}/>
    </>
  )
}

export default Testmonial