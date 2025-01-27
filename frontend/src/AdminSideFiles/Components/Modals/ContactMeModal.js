import React from 'react'

const ContactMeModal = ({inputUpdateData , handleUpdateChange , handleUpdate , handleReset , modalRef}) => {
  return (
    <>
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">{inputUpdateData._id}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef} onClick={() => {handleReset()}}></button>
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
                    <button type="button" className="btn btn-primary" onClick={(e) => {handleUpdate(e)}}>Update Contact Info</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default ContactMeModal