import { useEffect, useState } from "react";
import "../../Course/Course.css"
import { IoMdPerson } from "react-icons/io";
import { WiTime2 } from "react-icons/wi";
import { toast } from 'react-toastify';
import Loader from '../../ErrorPage/Loader';
import { useAuthentication } from '../../../store/Authentication';

const AdminCourses = () => {
  const [courseData, setCourseData] = useState([]);
  const [loader, setLoader] = useState(false);

  const {API} = useAuthentication();

  const courseDataFetch = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${API}/api/auth-registration/course`, {
        method: "GET"
      });
      const coursedata = await res.json();
      setCourseData(coursedata);
      setLoader(false);
    } catch (error) {
      console.log("Error in Fetching course data",error);
    }
  }


  useEffect(() => {
    courseDataFetch();
  }, []);

  const handleEdit = () => {
    toast.error("This feature is currently under development. Please check back later.");
  }
  
  const handleDelete = () => {
    toast.error("This feature is currently under development. Please check back later.");
  }


  return (
    <main className='course-main admin-main'>
      <div className="admin-heading">
        <p>Courses Details</p>
      </div>
      <section className='course-container'>
          {
            loader && <Loader />
          }
        <ul className='courses-container'>
          {
            courseData.map((currEle) => {
              const { _id, title, image, description, price, duration, instructor } = currEle;
              return (
                <li key={_id} className='course-card'>
                  <p className='price'>{price}</p>
                  <img src={image} alt="image" />
                  <div className='course-details'>
                    <p className='title'>{title}</p>
                    <div className='course-i-d'>
                      <p className='instructor'><IoMdPerson size={18}/>{instructor}</p>
                      <p className='instructor'><WiTime2 size={18}/>{duration}</p>
                    </div>
                    <hr className='hr' />
                    <p className='description'>{description}</p>
                    <div className="course-btn-div">
                    <button className='edit' onClick={handleEdit}>Edit</button>
                    <button className='main-delete' onClick={handleDelete}>Delete</button>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </section>
    </main>
  )
}

export default AdminCourses
