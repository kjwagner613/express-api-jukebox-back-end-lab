const express = require('express');
const router = express.Router();

let songs = [
  { id: 1, title: "Song 1", artist: "Artist 1", duration: "3:45" },
  { id: 2, title: "Song 2", artist: "Artist 2", duration: "4:00" },
];

// Read: Get all songs
router.get('/', (req, res) => {
  res.json(songs);
});

// Create: Add a new song
router.post('/', (req, res) => {
  const newSong = { id: Date.now(), ...req.body };
  songs.push(newSong);
  res.status(201).json(newSong);
});

// Update: Edit an existing song
router.put('/:id', (req, res) => {
  const songId = Number(req.params.id);
  const songIndex = songs.findIndex(song => song.id === songId);
  if (songIndex !== -1) {
    songs[songIndex] = { id: songId, ...req.body };
    res.json(songs[songIndex]);
  } else {
    res.status(404).send('Song not found');
  }
});

// Delete: Remove a song
router.delete('/:id', (req, res) => {
  const songId = Number(req.params.id);
  songs = songs.filter(song => song.id !== songId);
  res.status(204).send();
});

module.exports = router;