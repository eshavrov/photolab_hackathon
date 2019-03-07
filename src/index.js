var fs = require('fs');
const crc32 = require('../utils/crc32');

const addChunk = (data, chunk) => {
	const start = data.length - 12;
	
  return Buffer.concat([data.slice(0, start), chunk, data.slice(start, data.length)]);
};

const createChunk = (name, data) => {
  const len = Buffer.allocUnsafe(4);
  len.writeInt32BE(data.length, 0);
  const _data = Buffer.concat([Buffer.from(name), data]);
	const result = Buffer.concat([len, _data, crc32(_data)]);
	
  return result;
};

const writeNewPNGFile = (path, newPath, { text, img }) => {
  fs.readFile(path, function(err, data) {
    if (err) throw err;
    const buffer = Buffer.from(text);

    fs.writeFile(newPath, addChunk(data, createChunk('xxXx', buffer)), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
  });
};

module.exports = {
  addChunk,
  createChunk,
  writeNewPNGFile,
};
