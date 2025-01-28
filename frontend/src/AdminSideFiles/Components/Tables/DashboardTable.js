import React from 'react'

const DashboardTable = ({dashboardData , handleModalData , handleDelete}) => {
  return (
    <>
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
                        <td className='text-center'><img src={`${process.env.REACT_APP_BASE_URL}assets/uploads/images/${item.userImage}`} alt={item.userImage} width={'50px'} height={'50px'} /></td>
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

export default DashboardTable