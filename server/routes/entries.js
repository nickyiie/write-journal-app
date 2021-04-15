const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function readEntries() {
    let entriesData = fs.readFileSync('./data/entries.json');
    let parsedData = JSON.parse(entriesData);
    return parsedData;
}

router.get('/', (req, res) => {
  res.json(readEntries());
});

router.put('/:userId/new', (req, res) => {
  const { entry, title, mood } = req.body;

  const postDate = new Date();
  const dateOfPost = (`${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}`)
  
  const newEntry = {
      entryId: uuidv4(),
      date: dateOfPost,
      mood: mood,
      title: title,
      entry: entry
  };

  const entries = readEntries();
  entries.map((entry) => {
    if (req.params.userId === entry.userId) { 
      entry.entries.unshift(newEntry);
  fs.writeFileSync('./data/entries.json', JSON.stringify(entries));
  }})
   

  res.json(newEntry);
});

router.delete('/:userId/:entryId', (req, res) => {
  let entries = readEntries();
  let userEntries = entries.find((user) => (user.userId === req.params.userId))
  let deleteUserEntry = userEntries.entries.findIndex(entry => entry.entryId === req.params.entryId);
  console.log(userEntries)
  userEntries.entries.splice(deleteUserEntry, 1);

  fs.writeFileSync('./data/entries.json', JSON.stringify(entries));

  res.json('deleted');
});


module.exports = router;