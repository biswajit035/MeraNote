import React, { useContext } from 'react'
import '../../home.css';
import NoteContext from '../../context/Notes/NoteContext';

const Noteitem = (props) => {
    const { note, updateNote} = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const handleDelete = () => {
        deleteNote(note._id)
        props.showalert("Successfully deleted", "success")
    }
    return (   
        <div className='Noteitem'>
            <div className="Noteitem_card">
                <div className="Noteitem_card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
                <div className='Noteitem_card-fotter'>
                    <i className="fa-solid fa-trash mx-2" onClick={handleDelete}/>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}/>
                </div>
            </div>
        </div>
    )
}

export default Noteitem