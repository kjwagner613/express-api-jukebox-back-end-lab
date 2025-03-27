const express = require('express');
const router = express.Router();

const Track = require('../models/track'); // Import the Mongoose model

router.post('/', async (req, res) => {
  try {
    const newTrack = await Track.create(req.body); // Save the track to MongoDB
    res.status(201).json(newTrack); // Send the new track back as a response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add track' });
  }
});


router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find(); // Fetch tracks from the DB
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find(); // Fetch all tracks from MongoDB
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