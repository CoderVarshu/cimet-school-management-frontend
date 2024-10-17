import 'react-toastify/dist/ReactToastify.css';
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideNav />
        <div className="w-3/4 bg-white p-6 min-h-[70vh]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home