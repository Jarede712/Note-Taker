const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.get('/', (req, res) => { 
    // This handles /api/notes due to the way it's mounted in server.js
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});




router.post('/api/notes', (req, res) => {
    const newNote = { ...req.body, id: uuidv4() };

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile('db/db.json', JSON.stringify(notes, null, 4), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);

        fs.writeFile('db/db.json', JSON.stringify(notes, null, 4), (err) => {
            if (err) throw err;
            res.json({ message: "Note deleted successfully" });
        });
    });
});

module.exports = router;
