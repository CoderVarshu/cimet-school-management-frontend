import { ListSchool } from "../components/admin/ListSchool"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  return (
    <div>
      <ToastContainer />
      <ListSchool />
    </div>
  )
}

export default Home