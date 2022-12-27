import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Notes from './components/Dashboard/Notes';
import NoteState from './context/Notes/NoteState';
import { useState } from 'react';
import Landing from './components/Landing/Landing';
import Notification from './components/Notifications/Notification'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const host = "https://meranote.herokuapp.com/"
  const host = "http://localhost:8000/"
  // const [alert, setAlert] = useState({
  //   msg: null,
  //   type: null
  // })
  const showalert = (msg, type) => {
    // setAlert({ msg, type })
    if (type === 'warn')
      toast.warn(`${msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    else
      toast.success(`${msg}`)
    // setTimeout(() => {
    //   setAlert({
    //     msg:null,
    //     type:null
    //   })
    // }, 5000);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          {/* <Navbar /> */}
          {/* <Notification alert={alert} /> */}
          <ToastContainer />
          <div className='container'>
            <Routes>
              <Route path={`/`} element={<Notes showalert={showalert} />} />
              <Route path={`/landing/login`} element={<Landing showalert={showalert} />} />
              <Route path={`/landing/signup`} element={<Landing showalert={showalert} />} />
              {/* <Route path={`/signup`} element={<Signup showalert={showalert} />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
