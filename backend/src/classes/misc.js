let states = {
  200: {
    error: '',
    message: 'Request successfully processed.',
  },
  400: {
    error: 'Bad Request',
    message: 'Your request had errors.',
  },
  404: {
    error: 'Not Found',
    message: 'You reached the end of this road.',
  },
  500: {
    error: 'Internal Server Error',
    message: 'Ooops. What did I fuck up this time? :c',
  },
};

let filterableProps = ['type', 'price'];

export default function response(req, res, status, data = {}) {
  // object for additional info
  let info = {
    start: 0,
    limit: 0,
    size: 0,
  };

  // Some additional processing if data is an array
  if (Array.isArray(data)) {
    // Filter by {properties}
    Object.keys(req.query).forEach((prop) => {
      if (!filterableProps.includes(prop) || !req.query[prop]) return;
      // @ts-ignore
      data = data.filter((el) => el[prop] && el[prop].toUpperCase().includes(req.query[prop].toString().toUpperCase()));
    });

    let start = parseInt(req.query.start ? req.query.start.toString() : '0');
    if (start) {
      info.start = start;
      data = data.slice(start);
    }

    let limit = parseInt(req.query.limit ? req.query.limit.toString() : '0');
    if (limit > 0) data = data.slice(0, limit);
    info.limit = limit;

    info.size = data.length;
  }

  let { error, message } = states[status];
  res.status(status);
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    error,
    message,
    ...info,
    response: data ? data : {},
  });
}
