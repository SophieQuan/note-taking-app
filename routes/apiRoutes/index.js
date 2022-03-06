const router = require('express').Router();
const { createNewNotes, validateNotes } = require('../../lib/notes');
const { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNotes(req.body)) {
        res.status(400).send('The notes is not properly formatted.');
    } else {
        const note = createNewNotes(req.body, notes);
        res.json(note);
    }
})

router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    const noteIndex = notes.findIndex(p => p.id == id);

    notes.splice(noteIndex, 1);

    return res.send();
});

module.exports = router;