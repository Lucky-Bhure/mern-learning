import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Course from "./pages/Course/Course";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AppLayout from "./components/AppLayout/AppLayout";
import Logout from "./pages/Logout/Logout";
import Admin from "./pages/Admin/Admin";
import AdminUsers from "./pages/Admin/AdminUsers/AdminUsers";
import AdminContacts from "./pages/Admin/AdminContacts/AdminContacts";
import AdminMain from "./pages/Admin/AdminMain/AdminMain";
import UpdateUser from "./pages/Admin/AdminUsers/UpdateUser/UpdateUser";
import AdminCourses from "./pages/Admin/AdminCourses/AdminCourses";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/course",
          element: <Course />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/admin",
          element: <Admin />,
          children: [
            {
              path: "/admin/",
              element: <AdminMain />
            },
            {
              path: "/admin/users",
              element: <AdminUsers/>
            },
            {
              path: "/admin/users/edit/:id",
              element: <UpdateUser />
            },
            {
              path: "/admin/contacts",
              element: <AdminContacts />
            },
            {
              path: "/admin/courses",
              element: <AdminCourses />
            }
          ]
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
          // action: getFormData,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
    {
      path: "/*",
      element: <ErrorPage />
    }
  ]);

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/service' element={<Service />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/logout' element={<Logout />}/>
          <Route path='/*' element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
