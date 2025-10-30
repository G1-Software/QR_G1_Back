const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

app.use(helmet());               
app.use(cors());                 
app.use(express.json());         
app.use(morgan('dev'));         


const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });
app.use(limiter);

app.use('/staff', require('./routes/staff'));
app.use('/request', require('./routes/request'));
app.use('/qr', require('./routes/qr'));
app.use('/qr_scan_log', require('./routes/qr_scan_log'));
app.use('/page', require('./routes/page'));
app.use('/page_view_log', require('./routes/page_view_log'));

app.get('/', (_req, res) => res.send('Hello World! desde QR_G1_Software_Back'));

const port = process.env.PORT;

module.exports = app;
//app.listen(port, () => {console.log(`Server listening on ${port}`)});

