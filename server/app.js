import express from 'express';
import routes from './routes';
import expressConfig from './config/express';

const app = express();

// config express
expressConfig(app);

// config routes
routes(app);

let port = process.env.port || 3333;

// start server
app.listen(port, () => {
  console.log('App listening on port ' + port);
});

// Expose app
exports = module.exports = app;
