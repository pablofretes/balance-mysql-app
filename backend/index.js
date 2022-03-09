require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);

require('./db');
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);

server.listen(3001, () => {
  console.log(`Server ready`);
});