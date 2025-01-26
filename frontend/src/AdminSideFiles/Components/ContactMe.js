import React , { useState , useEffect } from 'react'
import { toast } from 'react-toastify';

const ContactMe = () => {

  const [render , setRender] = useState(false);

  const READCONTACT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readcontactinfo`;
  const [contactData , setContactData] = useState([]);
  
  const ADDCONTACT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/addcontactinfo`;
  const [inputAddData , setInputAddData] = useState({streetName : '' , areaName : '' , cityName : '' , stateName : '' , countryName : '' , pincode : '' , phoneNumber : '' , profileEnable : false});
    
  const UPDATECONTACT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/updatecontactinfo`;
  const [inputUpdateData , setInputUpdateData] = useState({_id : '' , streetName : '' , areaName : '' , cityName : '' , stateName : '' , countryName : '' , pincode : '' , phoneNumber : '' , profileEnable : false});
   
  const DELETECONTACT_URL = `${process.env.REACT_APP_BASE_URL}api/v1/deletecontactinfo`;

  useEffect(() => {
    const getContactData = async () => {
      const response = await fetch(READCONTACT_URL , {
        method : 'GET',
        credentials : 'include'
      });
      const responded = await response.json();
      if(responded.Result === true){
        setContactData(responded.data);
      }
    }
    getContactData();
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
    
    const response = await fetch(ADDCONTACT_URL , {
      method : 'POST',
      body : addFormData,
      credentials : 'include'
    });
    const responded = await response.json();
    if(responded.Result === true){
      setRender(!render);
      setInputAddData({streetName : '' , areaName : '' , cityName : '' , stateName : '' , countryName : '' , pincode : '' , phoneNumber : '' , profileEnable : false});
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
    setInputUpdateData({_id : contactData[index]._id , streetName : contactData[index].streetName , areaName : contactData[index].areaName , cityName : contactData[index].cityName , stateName : contactData[index].stateName , countryName : contactData[index].countryName , pincode : contactData[index].pincode , phoneNumber : contactData[index].phoneNumber , profileEnable : contactData[index].profileEnable });
  }
  const handleReset = (e) => {
    setInputUpdateData({_id : '' , streetName : '' , areaName : '' , cityName : '' , stateName : '' , countryName : '' , pincode : '' , phoneNumber : '' , profileEnable : false});
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

    const response = await fetch(`${UPDATECONTACT_URL}/${inputUpdateData._id}` , {
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
    const response = await fetch(`${DELETECONTACT_URL}/${Id}` , {
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
          <h2>ContactMe</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="mt-3">
            <label htmlFor="streetName" className="form-label">Street Name</label>
            <input type="text" className="form-control" id="streetName" name="streetName" placeholder="Please Enter Street Name" value={inputAddData.streetName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="areaName" className="form-label">Area Name</label>
            <input type="text" className="form-control" id="areaName" name="areaName" placeholder="Please Enter Area Name" value={inputAddData.areaName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="cityName" className="form-label">City Name</label>
            <input type="text" className="form-control" id="cityName" name="cityName" placeholder="Please Enter City Name" value={inputAddData.cityName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="stateName" className="form-label">State Name</label>
            <input type="text" className="form-control" id="stateName" name="stateName" placeholder="Please Enter State Name" value={inputAddData.stateName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="countryName" className="form-label">Country Name</label>
            <input type="text" className="form-control" id="countryName" name="countryName" placeholder="Please Enter Country Name" value={inputAddData.countryName} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="pincode" className="form-label">Pincode</label>
            <input type="text" className="form-control" id="pincode" name="pincode" placeholder="Please Enter Pincode" value={inputAddData.pincode} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="phoneNumber" className="form-label">Pincode</label>
            <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Please Enter Phone" value={inputAddData.phoneNumber} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="form-check form-switch mt-3">
            <input className="form-check-input" type="checkbox" role="switch" id="profileEnable" name="profileEnable" checked={inputAddData.profileEnable}  onChange={ (e) => handleAddChange(e)}/>
            <label className="form-check-label" htmlFor="profileEnable">Enable the Profile In Portfolio</label>
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
                <th>Street Name</th>
                <th>Area Name</th>
                <th>City Name</th>
                <th>State Name</th>
                <th>Country Name</th>
                <th>Pincode</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                contactData && contactData.length > 0 ?

                contactData.map((item , index) => {
                  return (
                      <tr key={item._id}>
                        <td className='text-center'>{index + 1}</td>
                        <td>{item.streetName}</td>
                        <td>{item.areaName}</td>
                        <td>{item.cityName}</td>
                        <td>{item.stateName}</td>
                        <td>{item.countryName}</td>
                        <td>{item.pincode}</td>
                        <td>{item.phoneNumber}</td>
                        <td className='text-center'><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => handleModalData(index)}>Edit</button></td>
                        <td className='text-center'><button type="button" className="btn btn-danger" onClick={ () => handleDelete(item._id)}>Delete</button></td>
                      </tr>
                  );
                })
                

                :

                <tr>
                  <td colSpan={9} className='text-center'>No Data Available</td>
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
                    <label htmlFor="updateStreetName" className="form-label">Street Name</label>
                    <input type="text" className="form-control" id="updateStreetName" name="streetName" placeholder="Please Enter Street Name" value={inputUpdateData.streetName} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updateAreaName" className="form-label">Area Name</label>
                    <input type="text" className="form-control" id="updateAreaName" name="areaName" placeholder="Please Enter Area Name" value={inputUpdateData.areaName} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updateCityName" className="form-label">City Name</label>
                    <input type="text" className="form-control" id="updateCityName" name="cityName" placeholder="Please Enter City Name" value={inputUpdateData.cityName} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updateStateName" className="form-label">State Name</label>
                    <input type="text" className="form-control" id="updateStateName" name="stateName" placeholder="Please Enter State Name" value={inputUpdateData.stateName} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updateCountryName" className="form-label">Country Name</label>
                    <input type="text" className="form-control" id="updateCountryName" name="countryName" placeholder="Please Enter Country Name" value={inputUpdateData.countryName} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updatePincode" className="form-label">Pincode</label>
                    <input type="text" className="form-control" id="updatePincode" name="pincode" placeholder="Please Enter Pincode" value={inputUpdateData.pincode} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updatePhoneNumber" className="form-label">Pincode</label>
                    <input type="text" className="form-control" id="updatePhoneNumber" name="phoneNumber" placeholder="Please Enter Phone" value={inputUpdateData.phoneNumber} onChange={ (e) => handleUpdateChange(e)}/>
                  </div>
                  <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="updateProfileEnable" name="profileEnable" checked={inputUpdateData.profileEnable}  onChange={ (e) => handleUpdateChange(e)}/>
                    <label className="form-check-label" htmlFor="updateProfileEnable">Enable the Profile In Portfolio</label>
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

export default ContactMe