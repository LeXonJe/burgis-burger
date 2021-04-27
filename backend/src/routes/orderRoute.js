import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import DB from '../classes/database.js';
import response from '../classes/misc.js';

const router = express.Router();
const data = new DB('orders');

router.post('/', (req, res) => {
  const body = req.body;
  
  if (('list', 'details' in body)) {
    const doc = {
      _id: uuidv4(),
      date: new Date().toJSON(),
      ...body,
    };

    data
      .add(doc)
      .then(() => {
        response(req, res, 200);
        console.log('Order ' + doc._id + ' was added.');
      })
      .catch((e) => {
        response(req, res, 500);
        console.error(e);
      });
  } else {
    response(req, res, 400);
  }
});

router.delete('/', (req, res) => {
  if ('_id' in req.body) {
    const id = req.body._id;

    data
      .delete(id)
      .then(() => {
        response(req, res, 200);
        console.log('Order ' + id + ' was removed.');
      })
      .catch((e) => {
        response(req, res, 500);
        console.error(e);
      });
  } else {
    response(req, res, 400);
  }
});

router.get('/', (req, res) => {
  data.getDocs().then((data) => {
    response(req, res, 200, data);
    console.log('Orders were requested.');
  }).catch((e) => {
    response(req, res, 500);
    console.error(e);
  });
});

export default router;
