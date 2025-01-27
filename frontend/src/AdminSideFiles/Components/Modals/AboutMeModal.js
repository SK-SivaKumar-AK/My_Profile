import React from 'react'

const AboutMeModal = ({inputUpdateData , handleUpdateChange , handleUpdate , handleReset , fileUpdateRef , modalRef}) => {
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
    </>
  )
}

export default AboutMeModal