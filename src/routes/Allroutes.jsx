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

const router = createBrowserRouter([
    {
        path: '/admin-dashboard',
        element: <Wrapper />,
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
                element: <ListTeachers />
            },
            {
                path: 'teacher/list-teachers',
                children: [
                    {
                        index: true,
                        element: <ListTeachers />,
                    },
                    {
                        path: 'add-teacher',
                        element: <TeacherForm />
                    },
                ]
            },

            {
                path: 'student/list-students',
                children: [

                    {
                        index: true,
                        element: <ListStudents />
                    },
                    {
                        path: 'add-student',
                        element: <StudentForm />
                    }
                ]
            },
            {
                path: 'classes/list-classes',
                children:[
                    {
                        index:true,
                        element: <ListClasses />
                    },
                    {
                        path:'add-class',
                        element: <ClassesForm />
                    }
                ]
            },
            {
                path: 'subjects/list-subjects',
                children:[
                    {
                        index:true,
                        element: <ListSubject />
                    },
                    {
                        path:'add-subject',
                        element: <SubjectForm />
                    }
                ]
            },
            {
                path: 'assignments/list-assignments',
                children:[
                    {
                        index: true,
                        element: <ListAssignments />
                    },
                    {
                        path:'add-assignment',
                        element: <AssignmentsForm />
                    }
                ]
            },
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

])

export const AllRoutes = () => {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}