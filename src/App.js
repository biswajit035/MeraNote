import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react';

function App() {
  // const host = "https://meranote.herokuapp.com/"
  const host = "http://localhost:8000/"
  const [alert, setAlert] = useState({
    msg: null,
    type: null
  })
  const showalert = (msg, type) => {
    setAlert({msg,type})
    // console.log(alert.type);

    console.log(type);
    setTimeout(() => {
      setAlert({
        msg:null,
        type:null
      })
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route path={`/`} element={<Home showalert={showalert} />} />
              <Route path={`/about`} element={<About />} />
              <Route path={`/login`} element={<Login showalert={showalert} />} />
              <Route path={`/signup`} element={<Signup showalert={showalert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
