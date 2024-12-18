import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "../pages/Wrapper";
import Home from "../pages/Home";
import SchoolForm from "../components/admin/SchoolForm";
import PrivateRoute from "../pages/admin/PrivateRoute";
import AdminLogIn from "../pages/admin/AdminLogIn";
import UserLogIn from "../pages/user/UserLogIn";
import TeacherForm from "../components/admin/TeacherForm";
import StudentForm from "../components/admin/StudentForm";
import ClassesForm from "../components/admin/ClassesForm";
import ListTeachers from "../components/ListTeachers";
import ListClasses from "../components/ListClasses";
import ListStudents from "../components/ListStudents";
import ListSubject from "../components/ListSubject";
import SubjectForm from "../components/admin/SubjectForm";
import ListAssignments from "../components/ListAssignments";
import AssignmentsForm from "../components/admin/AssignmentsForm";
// import { LandingPage } from "../pages/LandingPage";
import Profile from "../pages/Profile";
import PrivateRouteUser from "../pages/user/PrivateRouteUser";
import PageNotFound from "../pages/PageNotFound";
import PrivateRouteTeacher from "../pages/user/PrivateRouteTeacher";

const router = createBrowserRouter([
    {
        path:'/',
        element:<UserLogIn />
    },
    {
        path: '/admin-dashboard',
        element:<PrivateRoute> <Wrapper /> </PrivateRoute>,
    },
    {
        path: '/register',
        element: <PrivateRoute><SchoolForm /></PrivateRoute>,
    },
    {
        path: '/school/:id',
        element: <Home />,
        children: [
            {
                index: 'true',
                element: <PrivateRouteUser> <ListTeachers /></PrivateRouteUser>
            },
            {
                path: 'teacher/list-teachers',
                children: [
                    {
                        index: true,
                        element: <PrivateRouteUser> <ListTeachers /></PrivateRouteUser>,
                    },
                    {
                        path: 'add-teacher',
                        element:<PrivateRoute> <TeacherForm /></PrivateRoute>
                    },
                ]
            },
            {
                path: 'student/list-students',
                children: [

                    {
                        index: true,
                        element: <PrivateRouteUser> <ListStudents /> </PrivateRouteUser>
                    },
                    {
                        path: 'add-student',
                        element: <PrivateRoute><StudentForm /> </PrivateRoute>
                    }
                ]
            },
            {
                path: 'classes/list-classes',
                children:[
                    {
                        index:true,
                        element:<PrivateRouteUser> <ListClasses /></PrivateRouteUser>
                    },
                    {
                        path:'add-class',
                        element: <PrivateRoute> <ClassesForm /> </PrivateRoute>
                    }
                ]
            },
            {
                path: 'subjects/list-subjects',
                children:[
                    {
                        index:true,
                        element: <PrivateRouteUser> <ListSubject /> </PrivateRouteUser>
                    },
                    {
                        path:'add-subject',
                        element:<PrivateRoute> <SubjectForm /> </PrivateRoute>
                    }
                ]
            },
            {
                path: 'assignments/list-assignments',
                children:[
                    {
                        index: true,
                        element:<PrivateRouteUser> <ListAssignments /> </PrivateRouteUser>
                    },
                    {
                        path:'add-assignment',
                        element:<PrivateRouteTeacher> <AssignmentsForm /> </PrivateRouteTeacher>
                    }
                ]
            },
            {
                path:'profile',
                element: <PrivateRouteUser> <Profile /> </PrivateRouteUser>
            }
        ]
    },
    {
        path: '/adminlogin',
        element: <AdminLogIn />
    },
    {
        path: '/login',
        element: <UserLogIn />
    },
    {
        path:'*',
        element: <PageNotFound />
    }

])

export const AllRoutes = () => {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}