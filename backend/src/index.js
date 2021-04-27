import cors from 'cors';
import express from 'express';
import consoleStamp from 'console-stamp';

consoleStamp(console, { 
  format: ':date(dd/mm/yyyy HH:MM:ss.l) :label' 
});

import response from './classes/misc.js';
import menuRoute from './routes/menuRoute.js';
import moneyRoute from './routes/moneyRoute.js';
import orderRoute from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 3080;

// Allow cors
app.use(cors());

// Allow body parsing
app.use(express.json());

// Routes
app.use('/menu', menuRoute);
app.use('/money', moneyRoute);
app.use('/order', orderRoute);

// Catch all other requests
app.all('/', (req, res) => response(req, res, 200, 'Hello there! :)'));
app.all('*', (req, res) => response(req, res, 404));

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
