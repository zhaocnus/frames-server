import compression from 'compression';
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

export default function(app) {
  app.use(compression());

  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  // set the limit to allow sequence upload
  // http://stackoverflow.com/a/19965089/2259286
  app.use(bodyParser.json({
    limit: '50mb'
  }));

  // serve static file
  app.use('/upload_gif', express.static('upload_gif'));

  app.use(morgan('dev'));
}