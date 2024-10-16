import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import 'react-toastify/dist/ReactToastify.css';
import { ListSchool } from "../components/admin/ListSchool";

const Wrapper = () => {
  return (
    <>
    <Header/>
    <ListSchool />
    <Footer />
    </>
  )
}

export default Wrapper