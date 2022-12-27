import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = (props) => {
  useEffect(() => {
    toast.success('🦄 Wow so easy!')
  }, [])

  console.log("clicked");
  
  return (
    <div>
      {props.alert.msg &&
        <div >
          <ToastContainer />
        </div>}
    </div>
  )
}

export default Notification