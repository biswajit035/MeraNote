import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/Notes/NoteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import '../home.css'

const Notes = () => {
  const context = useContext(NoteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote, addNote } = context;
  const [enote, setEnote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    _eid: ""
  })
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  })
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate('/login');
    }
  }, [])
  const updateNote = async (note) => {
    ref.current.click();
    setEnote({
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
      _eid: note._id
    })
  }
  const add = () => {
    addn.current.click();

  }
  const addn = useRef(null)
  const ref = useRef(null)
  const close = useRef(null)
  const closeedt = useRef(null)
  const handleAdd = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    e.target.title.value = "";
    e.target.description.value = "";
    e.target.tag.value = "";
    close.current.click();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(enote._eid, enote.etitle, enote.edescription, enote.etag);
    closeedt.current.click();
  }
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const onchange = (e) => {
    setEnote({ ...enote, [e.target.name]: e.target.value })
  }
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
      </button>
      {/* <!--Edit Note Modal --> */}
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" ref={closeedt} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input type="text" className="form-control" onChange={onchange} value={enote.etitle} name="etitle" id="etitle" aria-describedby="emailHelp" placeholder="Enter Title" />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input type="text" className="form-control" onChange={onchange} value={enote.edescription} name="edescription" id="edescription" placeholder="Enter your note.." />
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input type="text" className="form-control" onChange={onchange} value={enote.etag} name="etag" id="etag" placeholder="Enter your tag" />
                </div>

                <button type="submit" className="btn btn-primary  my-2">Edit</button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={addn} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      {/* <!-- Add note Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Note</h5>
              <button type="button" className="close" ref={close} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" required={true} className="form-control" name="title" id="title" onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter Title" />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" required={true} autoComplete="off" className="form-control" name="description" id="description" onChange={handleChange} placeholder="Enter your note.." />
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input type="text" required={true} autoComplete="off" className="form-control" name="tag" id="tag" onChange={handleChange} placeholder="Enter your tag" />
                </div>

                {/* </form> */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary  my-2" >Add</button>

              </div>
            </form>
          </div>
        </div>
      </div>


      <div className='row my-3'>
        <h2 className="header">Your notes</h2>
        <div className="conatiner mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem note={note} key={note._id} updateNote={updateNote} />
        })}
      </div>
      <i className="fa-solid fa-circle-plus fa-5x addbtn" onClick={add} />
      {/* <Addnote /> */}
    </>
  )
}

export default Notes