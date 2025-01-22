import React from 'react'
import { useAuthentication } from '../../../store/Authentication';

const AdminContacts = () => {

    const { contactsData } = useAuthentication();

    return (
        <main className='admin-main'>
            <div className='admin-heading'>
                <p>Contacts Details</p>
            </div>

            <section className='contacts-section'>
                <ul className='contacts-container'>
                    {
                        contactsData.map((currEle) => {
                            const { _id, username, email, message } = currEle;
                            return <li key={_id} className='contact-info'>
                                <p><span>Username: </span>{username}</p>
                                <p><span>Email: </span>{email}</p>
                                <p><span>Messsage: </span>{message}</p>
                                <p><button className='delete'>Delete</button></p>
                            </li>
                        })
                    }
                </ul>
            </section>
        </main>
    )
}

export default AdminContacts