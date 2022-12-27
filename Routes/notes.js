const express = require('express')
const router = express.Router()
// const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// Route 1: get all the notes using: GET "/api/notes/fetchallnotes" [login required]
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id
     });
    res.json({ notes })
})

// Route 2: create notes using: POST "/api/notes/addnote" [login required]
router.post("/addnote", fetchuser, async (req, res) => {
    console.log("good");
    const { title, description, tag } = req.body;
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()
        res.json({ savenote })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

// Route 3: update notes using: PUT "/api/notes/update/:id" [login required]
router.put('/update/:id', fetchuser,async(req,res)=>{
    const {title, description, tag} = req.body;
    try {
    // create a new note
    const newNote = {};
    if(title){newNote.title = title;}
    if(description){newNote.description = description;}
    if(tag){newNote.tag = tag;}
    
    // find the note to be update
    let note =await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("NOT FOUND");}
    if (note.user.toString() !== req.user.id)
    { return res.status(401).send("NOT ALLOWED");
    }
    // console.log("point 1");
    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
    res.json({newNote})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

// Route 4: delete notes using: DELETE "/api/notes/delete/:id" [login required]
router.delete('/delete/:id', fetchuser,async(req,res)=>{
    const {title, description, tag} = req.body;
    try {
    // create a new note
    const newNote = {};
    if(title){newNote.title = title;}
    if(description){newNote.description = description;}
    if(tag){newNote.tag = tag;}
    
    // find the note to be deleted
    let note =await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("NOT FOUND");}
    if (note.user.toString() !== req.user.id)
    { return res.status(401).send("NOT ALLOWED");
    }
    // console.log("point 1");
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted"})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router