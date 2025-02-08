import { useEffect, useState } from 'react'
import { useAuthentication } from '../../../store/Authentication';

const AdminContacts = () => {

  const [contactsData, setContactsData] = useState();
  const { API, authorizedToken } = useAuthentication();

  // Get Users Contact Data
  const contactsDataFetching = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizedToken,
        },
      });

      if (response.ok) {
        const contactsdata = await response.json();
        setContactsData(contactsdata);
      }
    } catch (error) {
      console.log("Error in Users Data Featching");
    }
  };

  useEffect(() => {
    contactsDataFetching();
  }, [])

  // delete contact from sever
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizedToken,
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        contactsDataFetching();
      }

    } catch (error) {
      console.log("Error in Contact delete")
    }
  }

  return (
    <main className='admin-main'>
      <div className='admin-heading'>
        <p>Contacts Details</p>
      </div>

      <section className='contacts-section'>
        <ul className='contacts-container'>
          {
            contactsData ? contactsData?.map((currEle) => {
              const { _id, username, email, message } = currEle;
              return <li key={_id} className='contact-info'>
                <p><span>Username: </span>{username}</p>
                <p><span>Email: </span>{email}</p>
                <p><span>Messsage: </span>{message}</p>
                <p><button className='delete' onClick={() => handleDelete(_id)}>Delete</button></p>
              </li>
            }) : <h1>No Data Found</h1>
          }
        </ul>
      </section>
    </main>
  )
}

export default AdminContacts