import React, { useContext } from 'react'
import '../home.css';
import NoteContext from '../context/Notes/NoteContext';

const Noteitem = (props) => {
    const { note, updateNote} = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    return (   
        <div className='col-md-4 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}/>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}/>
                </div>
            </div>
        </div>
    )
}

export default Noteitem