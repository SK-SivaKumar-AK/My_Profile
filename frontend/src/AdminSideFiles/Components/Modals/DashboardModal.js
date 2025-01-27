import React from 'react'

const DashboardModal = ({inputUpdateData , handleUpdateChange , handleUpdate , handleReset , fileUpdateRef , modalRef}) => {
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
                    <label htmlFor="updateMainContent" className="form-label">Main Content</label>
                    <input type="text" className="form-control" id="updateMainContent" name="mainContent" value={inputUpdateData.mainContent} onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                    <div className="mt-3">
                    <label htmlFor="updateSubContent" className="form-label">Sub Content</label>
                    <textarea className="form-control" id="updateSubContent" name="subContent" rows="3" value={inputUpdateData.subContent}  onChange={(e) => {handleUpdateChange(e)}}></textarea>
                    </div>
                    <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="updateContentEnable" name="contentEnable" checked={inputUpdateData.contentEnable} onChange={ (e) => handleUpdateChange(e)}/>
                    <label className="form-check-label" htmlFor="updateContentEnable">Enable the Content In Portfolio</label>
                    </div>
                    <div className="mt-3">
                    <label className="form-label text-dark" htmlFor="image">User Picture</label>
                    <input type="file" className="form-control" id="image" name="image" ref={fileUpdateRef}  onChange={(e) => {handleUpdateChange(e)}}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="mt-3">
                    <button type="button" className="btn btn-primary" onClick={(e) => {handleUpdate(e)}}>Update Dashboard Info</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DashboardModal