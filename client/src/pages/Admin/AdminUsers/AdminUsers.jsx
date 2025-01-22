import React from 'react'
import { useAuthentication } from '../../../store/Authentication'

const AdminUsers = () => {

    const { usersData } = useAuthentication();

    return (
        <main className='admin-main'>
            <div className='admin-heading'>
                <p>Users Details</p>
            </div>

            <section className='table-section'>
                <table className='table-container'>
                    <thead className='table-head'>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Admin</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersData.map((currEle) => {
                                const {_id, username, phone, email, isAdmin} = currEle;
                                return <tr key={_id}>
                                <td>{username}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{isAdmin ? "Yes" : "No"}</td>
                                <td><button className='edit'>Edit</button></td>
                                <td><button className='delete'>Delete</button></td>
                            </tr>
                            })
                        }
                        
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default AdminUsers
