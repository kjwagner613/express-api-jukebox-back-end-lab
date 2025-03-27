const express = require('express');
const router = express.Router();

const Track = require('../models/track'); 

router.post('/', async (req, res) => {
  try {
    const newTrack = await Track.create(req.body); 
    res.status(201).json(newTrack); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add track' });
  }
});


router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find(); 
    res.json(tracks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});



router.put('/:id', async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrack) return res.status(404).json({ error: 'Track not found' });
    res.json(updatedTrack);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update track' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id); 
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }
    res.json(track);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch track details' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.id);
    if (!deletedTrack) return res.status(404).json({ error: 'Track not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete track' });
  }
});


module.exports = router;