import waterfall from 'async/waterfall';
import saveTmpSequence from './saveTmpSequence';
import removeTmpSequence from './removeTmpSequence';
import createGif from './createGif';
import { GIF_PUBLIC_URL } from '../../constants';

function handleError(res, statusCode) {
  return function(err) {
    res.status(statusCode || 500).send(err);
  }
}

/**
 * create animated gif from image sequence
 */
export function create(req, res) {
  const sequence = req.body.sequence;

  if (!Array.isArray(sequence) || sequence.length === 0) {
    return handleError(res)('Empty image sequence');
  }

  waterfall([
    saveTmpSequence(sequence),
    createGif()
  ], function (err, gifFilename, tmpDir) {
    if (err) return handleError(res)('Empty image sequence');

    res.send({
      fetchUrl: GIF_PUBLIC_URL + gifFilename
    });

    // remove tmp dir
    // This doesn't need to be included in the waterfall queue
    removeTmpSequence(tmpDir);
  });
}



