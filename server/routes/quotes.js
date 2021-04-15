const express = require('express');
const router = express.Router();
const fs = require('fs');
const { default: axios } = require('axios');

router.get('/' , (req, res, next) => {
  axios.get(`https://www.stands4.com/services/v2/quotes.php?uid=${process.env.REACT_APP_STANDS4_POETRY_UID}&tokenid=${process.env.REACT_APP_STANDS4_POETRY_TOKEN}&searchtype=RANDOM&format=json`)
  .then(response => {
    res.json(response.data)
  })
  .catch(err => res.send(err))
})

module.exports = router;