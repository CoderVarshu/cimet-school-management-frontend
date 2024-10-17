import { configureStore } from '@reduxjs/toolkit'
import schoolReducer from './slices/schoolSlice'
import authReducer from './slices/authSlice'
import teacherReducer from './slices/teacherSlice'
import studentReducer from './slices/studentsSlice'
import classReducer from './slices/classSlice'
import subjectReducer from './slices/subjectSlice'
import assignmentReducer from './slices/assignmentSlice'

export const store = configureStore({
  reducer: {
    school : schoolReducer,
    auth: authReducer,
    teacher: teacherReducer,
    student: studentReducer,
    class: classReducer,
    subject: subjectReducer,
    assignments: assignmentReducer,
  },
})