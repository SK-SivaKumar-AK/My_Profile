import React from 'react'

const TestmonialModal = ({inputUpdateData , handleUpdateChange , handleUpdate , handleReset , modalRef}) => {
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
    </>
  )
}

export default TestmonialModal