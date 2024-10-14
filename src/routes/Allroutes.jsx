import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "../pages/Wrapper";
import Home from "../pages/Home";
import SchoolForm from "../components/admin/SchoolForm";
import PrivateRoute from "../pages/admin/PrivateRoute";
import AdminLogIn from "../pages/admin/AdminLogIn";
import UserLogIn from "../pages/user/UserLogIn";
// import PrivateRouteUser from "../pages/user/PrivateRouteUser";
import SchoolDetails from "../pages/SchoolDetails";
import TeacherForm from "../components/admin/TeacherForm";
import StudentForm from "../components/admin/StudentForm";
import { ListSchool } from "../components/admin/ListSchool";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Wrapper/>,
        children: [
            {
                index: true,
                element:<PrivateRoute><ListSchool /></PrivateRoute>,
               
            },
            {
                path:'/list-school',
                element:<PrivateRoute><ListSchool /></PrivateRoute>,

            },
            {
                path:'/register',
                element:<PrivateRoute><SchoolForm /></PrivateRoute>,
            },
            {
                path:'/school/:id',
                element:<SchoolDetails/>
            },
            {
                path:'teacher/addTeacher',
                element:<TeacherForm />
            },
            {
                path:'/student/addStudent',
                element:<StudentForm />
            }
           
        ]
    },
    {
        path:'/adminlogin',
        element:<AdminLogIn/>
    },
    {
        path:'/login',
        element:<UserLogIn/>
    }
])

export const AllRoutes =()=>{
    return(
        <RouterProvider router={router}></RouterProvider>
    )
}