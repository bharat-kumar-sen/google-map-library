const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

const port = 7070;

app.use(express.json());

app.listen(port, () => {
  console.log("Hello TechnoJerrys API Is running on port: ", port);
})

// console.log('This is TechnoJerrys Node API');