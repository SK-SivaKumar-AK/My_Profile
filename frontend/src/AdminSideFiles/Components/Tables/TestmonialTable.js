import React from 'react'

const TestmonialTable = ({testmonialData , handleModalData , handleDelete}) => {
  return (
    <>
        <h4>History</h4>
        <table className="table table-bordered mb-5">
        <thead>
            <tr className='text-center'>
            <th>S.No</th>
            <th>Subject</th>
            <th>Person Name</th>
            <th>Person Role</th>
            <th>Update</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
            testmonialData && testmonialData.length > 0 ?

            testmonialData.map((item , index) => {
                return (
                    <tr key={item._id}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{item.subject}</td>
                    <td>{item.personName}</td>
                    <td>{item.personRole}</td>
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

export default TestmonialTable