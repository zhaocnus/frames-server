import del from 'del';

/**
 * Remove tmp sequence file
 */
export default function(tmpDir) {
  del([tmpDir]).then(() => {});
}