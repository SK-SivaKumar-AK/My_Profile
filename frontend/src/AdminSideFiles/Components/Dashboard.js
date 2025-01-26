import React , { useEffect , useState , useRef } from 'react'
import { toast } from "react-toastify";

const Dashboard = () => {

  const [render , setRender] = useState(false);
  const modalRef = useRef(null);
  

  const READDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}api/v1/readdashboardinfo`;
  const [dashboardData , setDashboardData] = useState([]);

  const ADDDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}api/v1/adddashboardinfo`;
  const [inputAddData , setinputAddData] = useState({mainContent : '' , subContent : '' , contentEnable : false});
  const fileAddRef = useRef(null);
  
  const UPDATEDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}api/v1/updatedashboardinfo`;
  const [inputUpdateData , setinputUpdateData] = useState({_id : '' , mainContent : '' , subContent : '' , contentEnable : false});
  const fileUpdateRef = useRef(null);
  

  const DELETEDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}api/v1/deletedashboardinfo`;

  




  useEffect(()=>{
    const getDashboardData = async () => {
      const response = await fetch(READDASHBOARD_URL , {
        method : 'GET',
        credentials : 'include'
      });
      const responded = await response.json();
      if(responded.Result === true){
        setDashboardData(responded.data);
      }
    }
    getDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [render]);





  const handleAddChange = (e) => {
    const { name , value , type , files , checked } = e.target;
    if(type === 'file'){
      setinputAddData({ ...inputAddData , [name] : files[0] });
    }else if(type === 'checkbox'){
      setinputAddData({ ...inputAddData , [name] : checked });
    }else{
      setinputAddData({ ...inputAddData , [name] : value });
    }
  }
  const handleAdd = async (e) => {
    e.preventDefault();

    const addFormData = new FormData();
    for(let key in inputAddData){
      addFormData.append(key , inputAddData[key]);
    }
    const response = await fetch( ADDDASHBOARD_URL , {
        method: 'POST',
        body: addFormData,
        credentials: 'include',
    });
    const responded = await response.json();
    if(responded.Result === true){
      setRender(!render);
      setinputAddData({mainContent : '' , subContent : '' , contentEnable : false});
      fileAddRef.current.value = '';
      toast.success( responded.Message, {
          position : 'top-center',
      });
      
    }else{
      toast.success( responded.Message || 'Something went wrong! Please try again.', {
          position : 'top-center',
      });
    }
   
  }




  
  const handleModalData = (index) => {
    modalRef.current.blur();
    setinputUpdateData({_id : dashboardData[index]._id , mainContent : dashboardData[index].mainContent , subContent : dashboardData[index].subContent , contentEnable : dashboardData[index].contentEnable});
  }
  const handleReset = ()=>{
    modalRef.current.blur();
    setinputUpdateData({_id : '' , mainContent : '' , subContent : '' , contentEnable : false});
    fileUpdateRef.current.value = '';
  }

  const handleUpdateChange = (e) => {
    const { name , value , type , checked , files } = e.target;
    if(type === 'file'){
      setinputUpdateData({ ...inputUpdateData , [name] : files[0] });
    }else if(type === 'checkbox'){
      setinputUpdateData({ ...inputUpdateData , [name] : checked });
    }else{
      setinputUpdateData({ ...inputUpdateData , [name] : value });
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateFormData = new FormData();
    for(let key in inputUpdateData){
      updateFormData.append(key , inputUpdateData[key]);
    }

    const response = await fetch( `${UPDATEDASHBOARD_URL}/${inputUpdateData._id}` , {
        method: 'POST',
        body: updateFormData,
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




  const handleDelete = async (Id) => {
    const response = await fetch( `${DELETEDASHBOARD_URL}/${Id}` , {
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
          <h2>DashBoard</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="mt-3">
            <label htmlFor="mainContent" className="form-label">Main Content</label>
            <input type="text" className="form-control" id="mainContent" name="mainContent" placeholder="Please Enter Main Content" value={inputAddData.mainContent} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="mt-3">
            <label htmlFor="subContent" className="form-label">Sub Content</label>
            <textarea className="form-control" id="subContent" name="subContent" rows="3" placeholder="Please Enter Sub Content" value={inputAddData.subContent} onChange={ (e) => handleAddChange(e)}></textarea>
          </div>
          <div className="mt-3">
            <label className="form-label text-dark" htmlFor="image">User Picture</label>
            <input type="file" className="form-control" id="image" name="image" ref={fileAddRef} onChange={ (e) => handleAddChange(e)}/>
          </div>
          <div className="form-check form-switch mt-3">
            <input className="form-check-input" type="checkbox" role="switch" id="contentEnable" name="contentEnable" checked={inputAddData.contentEnable}  onChange={ (e) => handleAddChange(e)}/>
            <label className="form-check-label" htmlFor="contentEnable">Enable the Content In Portfolio</label>
          </div>
          <div className="mt-3">
            <button type="button" className="btn btn-primary" onClick={ (e) => handleAdd(e)}>Save Dashboard Info</button>
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
                <th>Main Content</th>
                <th>Sub Content</th>
                <th>User Image</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                dashboardData && dashboardData.length > 0 ?

                dashboardData.map((item , index) => {
                  return (
                      <tr key={item._id}>
                        <td className='text-center'>{index + 1}</td>
                        <td>{item.mainContent}</td>
                        <td>{item.subContent}</td>
                        <td className='text-center'><img src={`${process.env.REACT_APP_BASE_URL}assets/uploads/${item.userImage}`} alt={item.userImage} width={'50px'} height={'50px'} /></td>
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
        </div>
      </div>
      
    </>
  )
}

export default Dashboard