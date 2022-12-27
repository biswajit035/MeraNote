import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../../context/Notes/NoteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import '../../home.css'
import Navbar from '../Navbar/Navbar'
import './notes.css'

const Notes = (props) => {
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
      navigate('/landing/login');
    }
  }, [])
  const updateNote = async (note) => {
    setShowEdit(!showEdit)
    setEnote({
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
      _eid: note._id
    })
  }
  const add = () => {
    setShowAdd(!showAdd);
  }
  const handleClose = () => {
    setShowAdd(false);
    setShowEdit(false);
  }

  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
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
    add();
    props.showalert("Notes Added", "success")
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(enote._eid, enote.etitle, enote.edescription, enote.etag);
    setShowEdit(!showEdit)
    props.showalert("Successfully Updated", "success")

  }
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const onchange = (e) => {
    setEnote({ ...enote, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Navbar />
      {/* <!-- Button trigger modal --> */}
      {/* <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
          Launch demo modal
        </button> */}

      {/* <!--Edit Note Modal --> */}
      {showEdit &&
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="addnotemodal">
            <div className="addnotemodal-content">
              <div className="addnotemodal-header">
                <span className="addnotemodal-title">Edit Note</span>
                <span className='addnotemodal_close' onClick={handleClose}>&times;</span>
              </div>
              {/* form */}
              <form onSubmit={handleSubmit} id='addnotemodal_form'>
                <div className="addnotemodal-body">

                  <label htmlFor="title">Title</label>
                  <input type="text" required={true} name="etitle" id="title" value={enote.etitle}  onChange={onchange} aria-describedby="emailHelp" placeholder="Enter Title" />
                  <label htmlFor="tag">Tag</label>
                  <input type="text" required={true} autoComplete="off" name="etag" id="tag" value={enote.etag} onChange={onchange} placeholder="Enter your tag" />
                  <label htmlFor="description">Description</label>
                  <textarea placeholder='Enter your note..' required={true} name="edescription" id="description" onChange={onchange} rows='10' contentEditable='true'>{enote.edescription}</textarea>
                </div>
                <div className="addnotemodal-footer">
                  <button type="button" onClick={handleClose}>Close</button>
                  <button type="submit" >Edit</button>
                </div>
              </form>

            </div>
          </div>
        </div>}

      {/* <!-- Button trigger modal --> */}
      {/* <button type="button" ref={addn} className="d-none" data-toggle="modal" data-target="#exampleModal">
          Launch demo modal
        </button> */}

      {/* <!-- Add note Modal --> */}
      {
        showAdd &&
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="addnotemodal">
            <div className="addnotemodal-content">
              <div className="addnotemodal-header">
                <span className="addnotemodal-title">Add Note</span>
                  <span className='addnotemodal_close' onClick={handleClose}>&times;</span>
              </div>
              <form onSubmit={handleAdd} id='addnotemodal_form'>
                <div className="addnotemodal-body">
                  <label htmlFor="title">Title</label>
                  <input type="text" required={true} name="title" id="title" onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter Title" />
                  <label htmlFor="tag">Tag</label>
                  <input type="text" required={true} autoComplete="off" name="tag" id="tag" onChange={handleChange} placeholder="Enter your tag" />
                  <label htmlFor="description">Description</label>
                  <textarea placeholder='Enter your note..' required={true} name="description" id="description" onChange={handleChange} rows='10'></textarea>
                </div>
                <div className="addnotemodal-footer">
                    <button type="button" onClick={handleClose}>Close</button>
                  <button type="submit" >Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }


      <div className='Notes'>
        <h2 className="Notes_header">Your notes</h2>
        <div className="Notes_container">
          {notes.length === 0 && 'No notes to display'}
          {notes.map((note) => {
            return <Noteitem note={note} key={note._id} updateNote={updateNote} showalert={props.showalert} />
          })}
        </div>
      </div>
      <i className="fa-solid fa-circle-plus addbtn" onClick={add} />
      {/* <Addnote /> */}
    </>
  )
}

export default Notes