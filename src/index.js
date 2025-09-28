require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(helmet());               
app.use(cors());                 
app.use(express.json());         
app.use(morgan('dev'));         


const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });
app.use(limiter);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on ${port}`));
