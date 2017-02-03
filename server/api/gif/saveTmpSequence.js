import path from 'path';
import fs from 'fs';
import uuid from 'node-uuid';
import mkdirp from 'mkdirp';
import map from 'async/map';
import waterfall from 'async/waterfall';
import { TMP_SEQUENCE_DIR } from '../../constants';

/**
 * Create sub tmp folder inside TMP_SEQUENCE_DIR to save all images
 */
function createTmpDir() {
  return function(cb) {
    const dir = path.join(TMP_SEQUENCE_DIR, uuid.v1());

    mkdirp(dir, err => {
      if (err) return cb(err);

      cb(null, dir);
    });
  };
}

/**
 * Save base64 seqeunce into sub tmp folder
 */
function saveSequenceToTmpDir(sequence) {
  return function(tmpDir, cb) {
    const indexes = sequence.map((base64, index) => index);
    const regex = /^data:image\/jpeg;base64,/;

    map(indexes, (index, next) => {
      const filename = path.join(tmpDir, index + '.jpg');

      fs.writeFile(filename, sequence[index].replace(regex, ''), 'base64',
        err => {
          if (err) return next(err);

          next(null, filename);
        }
      );
    }, (err, filenames) => {
      if (err) return cb(err);

      cb(null, filenames, tmpDir);
    })
  };
}

/**
 * Save base64 seqeunce into tmp folder
 */
export default function(sequence) {
  return function(cb) {
    waterfall([
      createTmpDir(),
      saveSequenceToTmpDir(sequence)
    ], (err, filenames, tmpDir) => {
      if (err) return cb(err);

      cb(null, filenames, tmpDir);
    });
  }
}