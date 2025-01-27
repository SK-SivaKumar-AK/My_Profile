import React from 'react'

const ExperienceTable = ({experienceData , handleModalData , handleDelete}) => {
  return (
    <>
        <h4>History</h4>
        <table className="table table-bordered mb-5">
        <thead>
            <tr className='text-center'>
            <th>S.No</th>
            <th>Role Name</th>
            <th>Role Description</th>
            <th>Year</th>
            <th>Company Name</th>
            <th>Company Location</th>
            <th>Update</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
            experienceData && experienceData.length > 0 ?

            experienceData.map((item , index) => {
                return (
                    <tr key={item._id}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{item.roleName}</td>
                    <td>{item.roleDescription}</td>
                    <td>{item.year}</td>
                    <td>{item.companyName}</td>
                    <td>{item.companyLocation}</td>
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
    </>
  )
}

export default ExperienceTable