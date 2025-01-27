import React from 'react'

const ContactMeTable = ({contactData , handleModalData , handleDelete}) => {
  return (
    <>
        <h4>History</h4>
        <table className="table table-bordered mb-5">
        <thead>
            <tr className='text-center'>
            <th>S.No</th>
            <th>Street Name</th>
            <th>Area Name</th>
            <th>City Name</th>
            <th>State Name</th>
            <th>Country Name</th>
            <th>Pincode</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
            contactData && contactData.length > 0 ?

            contactData.map((item , index) => {
                return (
                    <tr key={item._id}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{item.streetName}</td>
                    <td>{item.areaName}</td>
                    <td>{item.cityName}</td>
                    <td>{item.stateName}</td>
                    <td>{item.countryName}</td>
                    <td>{item.pincode}</td>
                    <td>{item.phoneNumber}</td>
                    <td className='text-center'><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => handleModalData(index)}>Edit</button></td>
                    <td className='text-center'><button type="button" className="btn btn-danger" onClick={ () => handleDelete(item._id)}>Delete</button></td>
                    </tr>
                );
            })
            

            :

            <tr>
                <td colSpan={9} className='text-center'>No Data Available</td>
            </tr>

            }
        </tbody>
        </table>
    </>
  )
}

export default ContactMeTable