import express from 'express';
import DB from '../classes/database.js';
import response from '../classes/misc.js';

const router = express.Router();
const data = new DB('menu');

router.get('/', (req, res) => {
  data.getDocs().then((data) => {
    console.log('Menu was requested.');
    response(req, res, 200, data);
  }).catch((e) => {
    response(req, res, 500);
    console.error(e);
  });
});

export default router;
