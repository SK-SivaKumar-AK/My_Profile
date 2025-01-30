import React from 'react'

const HeaderModal = ({userData , inputUpdateData , handleReset , handleUpdateChange , handleUpdate , fileUpdateRef , modalRef}) => {

  return (
    <>
        <div className="modal fade" id="userUpdateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">{userData[0].userName}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef} onClick={() => {handleReset()}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="updateUserName" className="form-label text-dark">UserName</label>
                            <input type="text" className="form-control" id="updateUserName" name="userName" placeholder="Please Enter User Name" value={inputUpdateData.userName} autoComplete="off" onChange={ (e) => handleUpdateChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updateUserEmail" className="form-label text-dark">UserEmail</label>
                            <input type="text" className="form-control" id="updateUserEmail" name="userEmail" placeholder="Please Enter User Email" value={inputUpdateData.userEmail} onChange={ (e) => handleUpdateChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updateUserPassword" className="form-label text-dark">UserPassword</label>
                            <input type="password" className="form-control" id="updateUserPassword" name="userPassword" placeholder="Please Enter User Password" value={inputUpdateData.userPassword} onChange={ (e) => handleUpdateChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-dark" htmlFor="updateImage">User Profile Picture</label>
                            <input type="file" className="form-control" id="updateImage" name="image" ref={fileUpdateRef} onChange={ (e) => handleUpdateChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-dark" htmlFor="updateResume">User Resume</label>
                            <input type="file" className="form-control" id="updateResume" name="resume" onChange={ (e) => handleUpdateChange(e)} ref={fileUpdateRef}/>
                        </div>
                        <div className="form-check form-switch mt-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="updateUserEnable" name="userEnable" checked={inputUpdateData.userEnable}  onChange={ (e) => handleUpdateChange(e)}/>
                            <label className="form-check-label text-dark" htmlFor="updateUserEnable">Enable the User In Portfolio</label>
                        </div>
                        
                        <hr />
                        
                        <button type="button" className="btn btn-primary" onClick={ (e) => handleUpdate(e)}>Update Info</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HeaderModal