import React, { useContext, useState } from 'react'
import NoteContext from '../context/Notes/NoteContext';

const Addnote = () => {
  const context = useContext(NoteContext);
  const {addNote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: ""
  })
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    e.target.title.value = "";
    e.target.description.value = "";
    e.target.tag.value = "";
  }
  const onchange = (e)=>{
    setnote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
          <h2 className="header">Add a note</h2>
      <form onSubmit={handleClick}>
              <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" name="title" id="title" onChange={onchange} aria-describedby="emailHelp" placeholder="Enter Title" />
              </div>
              <div className="form-group">
                  <label htmlFor="description">Description</label>
          <input type="text" className="form-control" name="description" id="description" onChange={onchange} placeholder="Enter your note.." />
              </div>
              <div className="form-group">
                  <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" name="tag" id="tag" onChange={onchange} placeholder="Enter your tag" />
              </div>
              
        <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary  my-2" >Add</button>
          </form>
    </div>
  )
}

export default Addnote