import React, { useState } from 'react'
import "../Register/Register.css"
import { useAuthentication } from '../../store/Authentication';
import { toast } from 'react-toastify';

const Contact = () => {

  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    message: ""
  });

  const [userData, setUserData] = useState(true);
  const { API, authorizedUser } = useAuthentication();

  if (userData && authorizedUser) {
    setContactData({
      ...contactData,
      username: authorizedUser.username,
      email: authorizedUser.email
    });
    setUserData(false);
  }

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setContactData({
      ...contactData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(contactData);
    try {
      const response = await fetch(
        `${API}/api/auth-registration/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactData),
        });


      const res_data = await response.json();

      if (response.ok) {
        toast.success("Contact Send Successfully");

        if (authorizedUser) {
          setContactData({
            username: authorizedUser.username,
            email: authorizedUser.email,
            message: ""
          });
        } else {
          setContactData({
            username: "",
            email: "",
            message: ""
          });
        }
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='main-container'>
      <section className='form-section'>
        <div>
          <h3 className="form-heading">Get in touch</h3>
          <h2 className='form-text'>We'd Love to Hear from You!</h2>
          <p className='form-sub-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum placeat atque autem nemo quod ullam veniam quaerat amet minus sequi!</p>
        </div>
        <form className='registration-form' onSubmit={handleSubmit}>
          <div className="input-fields">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={contactData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-fields">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={contactData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-fields">
            <label htmlFor="message">Message</label>
            <textarea
              type="taxt"
              id="message"
              name="message"
              rows={8}
              placeholder="Enter your message"
              value={contactData.message}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="register-btn">Submit</button>
        </form>
      </section>


      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41713.8670050592!2d79.05569995299331!3d21.151724647955444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c094604e27ab%3A0xb210b10c6f1e24c7!2sSitabuldi%20Station!5e0!3m2!1sen!2sin!4v1736848477286!5m2!1sen!2sin" width="100%" height="300" allowFullScreen="" style={{ marginTop: "3.3rem" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </main>
  )
}

export default Contact
