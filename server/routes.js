import gif from './api/gif';

// TODO: handle CORS
// chrome-extension://abclnifaoledmljndhhdccjjafkaccng
const ALLOW_ORIGINS = {
  'http://127.0.0.1:9000': true,
  'http://localhost:9000': true,
};

export default function(app) {
  // Allow cross-origin resource sharing (CORS)
  // http://stackoverflow.com/a/11182153
  app.use(function(req, res, next) {
    let origin = req.headers.origin;

    if (ALLOW_ORIGINS.hasOwnProperty(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    next();
  });

  app.use('/api/gif', gif);

  app.get('*', (req, res) => {
    res.send('success');
    // res.status(404).end();
  });
}
