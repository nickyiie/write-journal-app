const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function readUsers() {
  let usersData = fs.readFileSync('./data/users.json');
  let parsedData = JSON.parse(usersData);
  return parsedData;
}

router.get('/', (req, res) => {
  res.json(readUsers());
})

  .post('/', (req, res) => {
    const { uid } = req.body;

    const newUser = {
      uid: uid,
      currLevel: 0,
      currExp: 0
    }

    const users = readUsers();
    users.unshift(newUser)
    fs.writeFileSync('./data/users.json', JSON.stringify(users))
  })

router.get('/:userId', (req, res) => {
  users = readUsers();
  let currUser = users.find((user) => (user.uid === req.params.userId))
  res.json(currUser)
})

router.put('/:userId', (req, res) => {
  const { experience } = req.body;

  const postDate = new Date();
  const dateOfPost = (`${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()}`)


  const userExp = {
    experience: experience,
    values: dateOfPost
  };

  const users = readUsers();
  let currUser = users.find((user) => (req.params.userId === user.uid));
  console.log(currUser.values)
  if (currUser.currExp >= 98) {
    currUser.currLevel++;
    currUser.currExp = 0
  } else {
    currUser.currExp += userExp.experience
  }

  currUser.values.filter((today) => {
    if (today.date === dateOfPost ) {
      today.count++
    } else if (today.date !== dateOfPost) {
      currUser.values.unshift({ date: dateOfPost, count: 1})
    }
    console.log(currUser.values)
  })  

  fs.writeFileSync('./data/users.json', JSON.stringify(users));
  res.json(userExp);
});

router.put('/t/:userId', (req, res) => {
  const { experience } = req.body;

  const userExp = {
    experience: experience
  };

  const users = readUsers();
  let currUser = users.find((user) => (req.params.userId === user.uid));
  console.log(currUser.values)
  if (currUser.currExp >= 98) {
    currUser.currLevel++;
    currUser.currExp = 0
  } else {
    currUser.currExp += userExp.experience
  }
  console.log(currUser.currExp)

  fs.writeFileSync('./data/users.json', JSON.stringify(users));
  res.json(userExp);
});


module.exports = router;