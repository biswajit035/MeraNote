import React from 'react'

import '../home.css';
import Notes from './Notes';

export const Home = (props) => {
  const {showalert} = props
  return (
    <div className='container'>
      {/* <h1 className="header">This is MeraNote</h1> */}
        <Notes showalert={showalert}/>
    </div>
  )
}
