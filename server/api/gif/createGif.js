import path from 'path';
import { exec }  from 'child_process';
import { format } from 'util';
import uuid from 'node-uuid';
import { GIF_DIR } from '../../constants';

/**
 * Create animated gif from tmp jpg sequence files
 */
export default function() {
  return function(filenames, tmpDir, cb) {
    // prepare imagemagick command
    const gifFilename = uuid.v1() + '.gif';
    const command = format(
      'convert -background "#ffffff" -alpha remove -layers OptimizePlus ' + // basic tags
      '-delay 3.3 "%s" ' + // frames at 33 ms interval
      '-loop 0 ' + // infinite loop
      '%s',
      filenames.join('" "'),
      path.join(GIF_DIR, gifFilename)
    );

    // execute command
    exec(command, err => {
      if (err) {
        console.error(err);
        console.error(command);
        return cb(err);
      }

      cb(null, gifFilename, tmpDir);
    });
  };
}