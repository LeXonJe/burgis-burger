import express from 'express';
import DB from '../classes/database.js';
import response from '../classes/misc.js';

const router = express.Router();
const data = new DB('money');

router.get('/', (req, res) => {
  data.getDocs().then((data) => {
    console.log('Money was requested.');
    response(req, res, 200, data);
  });
});

export default router;
