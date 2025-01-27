import React from 'react'

const ExperienceModal = ({inputUpdateData , handleUpdateChange , handleUpdate , handleReset , modalRef}) => {
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
    </>
  )
}

export default ExperienceModal