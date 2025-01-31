import React , { useEffect, useState } from 'react'
import { useOutletContext  } from 'react-router-dom'
import style from '../CSSFiles/ContactMe.module.css'
import { toast } from 'react-toastify'

const ContactMe = () => {

  const { userData } = useOutletContext();
  const [loading , setLoading] = useState(true);

  const GETCONTACTFRONT_URL = `${process.env.REACT_APP_BASE_URL}/readcontactinfofront`;
  const [contactData , setContactData] = useState([]);

  const SENTEMAIL_URL = `${process.env.REACT_APP_BASE_URL}/contactmail`;
  const [sendData , setSendData] = useState({name : '' , email : '' , subject : '' , bodyContent : ''});

  useEffect(() => {
      const getContactDetails = async () => {
          const response = await fetch(`${GETCONTACTFRONT_URL}/${userData[0]._id}`);
          const responded = await response.json();
          if(responded.Result === true){
            setContactData(responded.data);
            setLoading(false);
          }
      }
      getContactDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  const handleSendChange = (e) => {
    const { name , value } = e.target;
    setSendData({...sendData , [name] : value});
  }
  const handleSend = async (e) => {
    e.preventDefault();

    const sendFormData = new FormData();
    for(let key in sendData){
      sendFormData.append(key , sendData[key]);
    }
    
    const response = await fetch(SENTEMAIL_URL , {
      method : 'POST',
      body : sendFormData
    });
    const responded = await response.json();
    console.log(responded);
    if(responded.Result === true){
      setSendData({name : '' , email : '' , subject : '' , bodyContent : ''});
      toast.success(responded.Message , {
        position : 'top-center'
      });
    }else{
      toast.error(responded.Message || 'Something Went Wrong! Try Again.' , {
        position : 'top-center'
      });
    }
  }

  return (
    <>
      {
        loading ? 
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-4">
                <h1 className="text-center">&nbsp;</h1>
            </div>
        </div>
        :
        <>
          <div className="col-12 text-white text-center mt-2">
              <h3 className='fs-1'><b>Contact Me</b></h3>
              <div className="row mt-4 justify-content-center">
                <div className="col-6 text-start">
                  <div className="mb-3">
                      <label htmlFor="userName" className="form-label">Your Name</label>
                      <input type="text" className="form-control" id="userName" name="name" placeholder="Please Enter Your Name" value={sendData.name} autoComplete='off' onChange={ (e) => handleSendChange(e)}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="userEmail" className="form-label">Your Email</label>
                      <input type="text" className="form-control" id="userEmail" name="email" placeholder="Please Enter Your Email" value={sendData.email} autoComplete='off' onChange={ (e) => handleSendChange(e)}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input type="text" className="form-control" id="subject" name="subject" placeholder="Please Enter Subject" value={sendData.subject}  autoComplete='off' onChange={ (e) => handleSendChange(e)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bodyContent" className="form-label">Body</label>
                    <textarea className="form-control" id="bodyContent" name="bodyContent" rows="3" placeholder="Please Enter Body Content" value={sendData.bodyContent} onChange={ (e) => handleSendChange(e)}></textarea>
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                      <button className="btn btn-primary" type="submit" onClick={ (e) => handleSend(e)}>Send</button>
                  </div>
                </div>
              </div>
          </div>
          <hr className={`text-light ${style.hr_line}`}/>
          <div className="col-lg-4 col-12 text-white d-flex justify-content-center">
            <div className='fs-5 text-center'>
              <address>
                {contactData[0].streetName} <br />
                {contactData[0].areaName} <br />
                {contactData[0].cityName}-{contactData[0].pincode} <br />
                {contactData[0].stateName}, {contactData[0].countryName}.
              </address>
            </div>
          </div>
          <div className="col-lg-4 col-12 text-white d-flex justify-content-center">
            <div className='fs-5'>
              Phone: {contactData[0].phoneNumber}
            </div>
          </div>
          <div className="col-lg-4 col-12 text-white d-flex justify-content-center">
            <div className='fs-5'>
              Email : {userData[0].userEmail}
            </div>
          </div>
        </>
      }
    </>
  )
}

export default ContactMe