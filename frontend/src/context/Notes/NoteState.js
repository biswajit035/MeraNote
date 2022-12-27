import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const notesinitial = []
    const [notes, setnotes] = useState(notesinitial)
    const host = "http://localhost:8000/"
  // const host = "https://meranoteserver.herokuapp.com/"
    // get Notes
    const getNotes = async() => {
        // API call
        const response = await fetch(`${host}api/notes/fetchallnotes`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setnotes(json.notes)
    }

    // add Note
    const addNote= async(title, description, tag)=>{
        //api call
        const response = await fetch(`${host}api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag})
        });
        const json = await response.json();
        getNotes();
    }

    // edit Note
    const editNote = async(id, title, description, tag) => {
        const response = await fetch(`${host}api/notes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        getNotes();
    }

    // delete Note
    const deleteNote = async(id) => {
        // api call
        const response = await fetch(`${host}api/notes/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        getNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;