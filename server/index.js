const express = require('express')
const app = express()
const port = 6000

require("dotenv").config();
const config = require("./config/config");

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sakim5027:DNFfkffk93@masilcluster.davlr.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityß')
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

