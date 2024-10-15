/* eslint-disable react/prop-types */
import ListClasses from "./ListClasses";
import ListStudents from "./ListStudents";
import Teachers from "./ListTeachers";

const InnerComponent = ({selectedComponent}) => {

    switch (selectedComponent) {
        case "Students":
          return <ListStudents />;
        case "Teachers":
          return <Teachers />;
        case "Classes":
          return <ListClasses/>;
          case "Courses":
              return "Courses";
        default:
          return "Assignments"
      }
}

export default InnerComponent