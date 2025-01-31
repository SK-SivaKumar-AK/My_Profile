import React , { useEffect , useState , useRef } from 'react'
import { toast } from "react-toastify";
import DashboardTable from './Tables/DashboardTable';
import DashboardModal from './Modals/DashboardModal';

const Dashboard = () => {

  const [render , setRender] = useState(false);
  const modalRef = useRef(null);
  

  const READDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}/readdashboardinfo`;
  const [dashboardData , setDashboardData] = useState([]);

  const ADDDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}/adddashboardinfo`;
  const [inputAddData , setinputAddData] = useState({mainContent : '' , subContent : '' , contentEnable : false});
  const fileAddRef = useRef(null);
  
  const UPDATEDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}/updatedashboardinfo`;
  const [inputUpdateData , setinputUpdateData] = useState({_id : '' , mainContent : '' , subContent : '' , contentEnable : false});
  const fileUpdateRef = useRef(null);
  

  const DELETEDASHBOARD_URL = `${process.env.REACT_APP_BASE_URL}/deletedashboardinfo`;

  




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
          <DashboardTable dashboardData={dashboardData} handleModalData={handleModalData} handleDelete={handleDelete}/>
        </div>
      </div>
      <DashboardModal inputUpdateData={inputUpdateData} handleUpdateChange={handleUpdateChange} handleUpdate={handleUpdate} handleReset={handleReset} fileUpdateRef={fileUpdateRef} modalRef={modalRef}/>
    </>
  )
}

export default Dashboard