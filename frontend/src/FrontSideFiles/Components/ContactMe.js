import React from 'react'
import style from '../CSSFiles/ContactMe.module.css'

const ContactMe = () => {
  return (
    <>
      <div className="col-12 text-white text-center mt-2">
          <h3 className='fs-1'><b>About</b></h3>
          <div className="row mt-4 justify-content-center">
            <div className="col-6 text-start">
              <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">Your Email</label>
                  <input type="text" className="form-control" id="userEmail" name="email" placeholder="Please Enter Your Email" autoComplete='off'/>
              </div>
              <div className="mb-3">
                  <label htmlFor="Subject" className="form-label">Subject</label>
                  <input type="text" className="form-control" id="Subject" name="Subject" placeholder="Please Enter Subject"  autoComplete='off'/>
              </div>
              <div className="mb-3">
                <label htmlFor="bodyContent" className="form-label">Body</label>
                <textarea className="form-control" id="bodyContent" name="bodyContent" rows="3" placeholder="Please Enter Body Content"></textarea>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                  <button className="btn btn-primary" type="submit">Send</button>
              </div>
            </div>
          </div>
      </div>
      <hr className={`text-light ${style.hr_line}`}/>
      <div className="col-lg-4 col-12 text-white d-flex justify-content-center">
        <div className='fs-5'>
          <address>
            6c Raja street <br />
            Subramaniyapuram <br />
            Trichy-620020 <br />
            Tamil Nadu, India.
          </address>
        </div>
      </div>
      <div className="col-lg-4 col-12 text-white d-flex justify-content-center">
        <div className='fs-5'>
          Phone: +91 8248052118
        </div>
      </div>
      <div className="col-lg-4 col-12 text-white d-flex justify-content-center">
        <div className='fs-5'>
          Email : sk@gmail.com
        </div>
      </div>
    </>
  )
}

export default ContactMe