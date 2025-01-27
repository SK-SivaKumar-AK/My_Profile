import React from 'react'

const ProjectModal = ({inputUpdateData , handleUpdateChange , handleUpdate , handleReset , fileUpdateRef , modalRef}) => {
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
                    <label htmlFor="updateProjectName" className="form-label">Main Content</label>
                    <input type="text" className="form-control" id="updateProjectName" name="projectName" value={inputUpdateData.projectName} onChange={(e) => {handleUpdateChange(e)}}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="updateProjectDescription" className="form-label">Sub Content</label>
                    <textarea className="form-control" id="updateProjectDescription" name="projectDescription" rows="3" value={inputUpdateData.projectDescription}  onChange={(e) => {handleUpdateChange(e)}}></textarea>
                  </div>
                  <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="updateProjectEnable" name="projectEnable" checked={inputUpdateData.projectEnable} onChange={ (e) => handleUpdateChange(e)}/>
                    <label className="form-check-label" htmlFor="updateProjectEnable">Enable the Project In Portfolio</label>
                  </div>
                  <div className="mt-3">
                    <label className="form-label text-dark" htmlFor="image">User Picture</label>
                    <input type="file" className="form-control" id="image" name="image" ref={fileUpdateRef}  onChange={(e) => {handleUpdateChange(e)}}/>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={(e) => {handleUpdate(e)}}>Update Project Info</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default ProjectModal