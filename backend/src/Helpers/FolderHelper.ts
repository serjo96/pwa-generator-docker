import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const rmdir = util.promisify(fs.rmdir);

export const mkDirByPathSync = (targetDir: string, opts?) => {
  const isRelativeToScript = opts && opts.isRelativeToScript;
  const sep = opts && opts.sep ? opts.sep : path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {

    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
      console.log(`Directory ${curDir} created!`);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        console.log(`Directory ${curDir} already exists!`);
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
};

export const removeDir = async (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    return 'folder is not exist';
  }

  const list = fs.readdirSync(dirPath);

  for (const item of list) {
    const filename = path.join(dirPath, item);
    const stat = fs.statSync(filename);

    if (filename === '.' || filename === '..') {
      // do nothing for current and parent dir
    } else if (stat.isDirectory()) {
      await removeDir(filename);
    } else {
      fs.unlinkSync(filename);
    }
  }

  await rmdir(dirPath);
};

export async function cleanImageFolder(dir) {
  try {
    const result = await removeDir(dir);

    console.log(`\nClean result: ${result}. Path: ${dir}`);
  } catch (err) {
    console.log('Error ', err);
  }
}
