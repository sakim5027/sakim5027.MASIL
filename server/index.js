const express = require('express');
const app = express();
//const bodyParser = require ('body-parser');
const port = 5000;

require("dotenv").config();
const config = require("./config/config");

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*
Originally body-parser dependency was used, 
but from express 4.xx their own body-parser implementation is included in Express.
*/

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sakim5027:DNFfkffk93@masilcluster.davlr.mongodb.net/myFirstDatabase?retryWrites=true')
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.use("/users", require ("./routes/users"));
// app.use("/contents", require ("./routes/contents"));
// app.use("/comments", require ("./routes/comments"));
// app.use("/likes", require ("./routes/likes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

