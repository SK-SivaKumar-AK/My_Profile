import React , { useState , useEffect , useRef } from 'react'
import { toast } from 'react-toastify';

const Testmonial = () => {

  const [render , setRender] = useState(false);
  const modalRef = useRef(null);

  const READTESTMONIAL_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readtestmonialinfo`;
  const [testmonialData , setTestmonialData] = useState([]);

  const ADDTESTMONIAL_URL = `${process.env.REACT_APP_BASE_URL}api/v1/addtestmonialinfo`;
  const [inputAddData , setInputAddData] = useState({subject : '' , personName : '' , personRole : '' , testmonialEnable : false});
  
  const UPDATETESTMONIAL_URL = `${process.env.REACT_APP_BASE_URL}api/v1/updatetestmonialinfo`;
  const [inputUpdateData , setInputUpdateData] = useState({_id : '' , subject : '' , personName : '' , personRole : '' , testmonialEnable : false});
    
  const DELETETESTMONIAL_URL = `${process.env.REACT_APP_BASE_URL}api/v1/deletetestmonialinfo`;


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
          <h4>History</h4>
          <table className="table table-bordered mb-5">
            <thead>
              <tr className='text-center'>
                <th>S.No</th>
                <th>Subject</th>
                <th>Person Name</th>
                <th>Person Role</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                testmonialData && testmonialData.length > 0 ?

                testmonialData.map((item , index) => {
                  return (
                      <tr key={item._id}>
                        <td className='text-center'>{index + 1}</td>
                        <td>{item.subject}</td>
                        <td>{item.personName}</td>
                        <td>{item.personRole}</td>
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
                    <label htmlFor="updateSubject" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="updateSubject" name="subject" placeholder="Please Enter Subject" value={inputUpdateData.subject} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updatePersonName" className="form-label">Person Name</label>
                    <input type="text" className="form-control" id="updatePersonName" name="personName" placeholder="Please Enter Person Name" value={inputUpdateData.personName} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updatePersonRole" className="form-label">Person Role</label>
                    <input type="text" className="form-control" id="updatePersonRole" name="personRole" placeholder="Please Enter Person Role" value={inputUpdateData.personRole} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="updateTestmonialEnable" name="testmonialEnable" checked={inputUpdateData.testmonialEnable}  onChange={ (e) => handleUpdateChange(e)}/>
                    <label className="form-check-label" htmlFor="updateTestmonialEnable">Enable the Testmonial In Portfolio</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={(e) => {handleUpdate(e)}}>Update Testmonial Info</button>
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

export default Testmonial