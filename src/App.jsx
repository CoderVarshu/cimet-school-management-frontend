
// import './App.css'
import { ToastContainer } from 'react-toastify'
import { AllRoutes } from './routes/Allroutes'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    <AllRoutes />
    </>
  )
}

export default App
