import React from 'react'

const ProjectTable = ({projectData , handleModalData , handleDelete}) => {
  return (
    <>
        <h4>History</h4>
        <table className="table table-bordered mb-5">
        <thead>
            <tr className='text-center'>
            <th>S.No</th>
            <th>Project Name</th>
            <th>Project Description</th>
            <th>Project Image</th>
            <th>Update</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
            projectData && projectData.length > 0 ?

            projectData.map((item , index) => {
                return (
                    <tr key={item._id}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{item.projectName}</td>
                    <td>{item.projectDescription}</td>
                    <td className='text-center'><img src={`${process.env.REACT_APP_BASE_URL}assets/uploads/${item.projectImage}`} alt={item.projectImage} width={'50px'} height={'50px'} /></td>
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

export default ProjectTable