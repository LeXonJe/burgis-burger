import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import DB from '../classes/database.js';
import response from '../classes/misc.js';

const router = express.Router();
const data = new DB('orders');

router.post('/', (req, res) => {
  const body = req.body;
  
  // Sanitzing the code
  if (('name', 'order' in body)) {
    const doc = {
      _id: uuidv4(),
      date: new Date().toJSON(),
      name: body.name,
      order: body.order,
    };

    if ('x', 'y', 'z' in body) {
      doc.x = body.x;
      doc.y = body.y;
      doc.z = body.z;
    }

    data
      .add(doc)
      .then(() => {
        console.log('Order ' + doc._id + ' was added.');
        response(req, res, 200, 'Order added.');
      })
      .catch((e) => {
        console.log(e);
        response(req, res, 500, 'Order could not be added.');
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
        console.log('Order ' + id + ' was removed.');
        response(req, res, 200, 'Order removed.');
      })
      .catch((e) => {
        console.log(e);
        response(req, res, 500, 'Order could not be removed.');
      });
  } else {
    response(req, res, 400);
  }
});

router.get('/', (req, res) => {
  data.getDocs().then((data) => {
    console.log('Orders were requested.');
    response(req, res, 200, data);
  });
});

export default router;
