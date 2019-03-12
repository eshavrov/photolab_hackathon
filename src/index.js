var fs = require('fs');
const crc32 = require('../utils/crc32');

const CHUNK_NAMES = {
  TEXT: 'xxXx',
  IMG: 'ixXx',
  OPTIONS: 'OPTS',
};

const encode = (data, key = 'default') => data;
const decode = (data, key = 'default') => data;

// https://www.w3.org/TR/PNG/#5Chunk-layout
const createChunk = (name, data, key = 'default') => {
  const len = Buffer.allocUnsafe(4);
  len.writeInt32BE(data.length, 0);
  const _data = encode(Buffer.concat([Buffer.from(name), data]), key);
  const result = Buffer.concat([len, _data, crc32(_data)]);

  return result;
};

const addChunk = (data, ...chunks) => {
  const start = data.indexOf('IEND') - 4;
  return start > 0 ? Buffer.concat([data.slice(0, start), ...chunks, data.slice(start, data.length)]) : data;
};

const writeNewPNGFile = (
  path,
  newPath,
  { text, buffer, options = { format: 'png', filename: 'output.png' } },
  key = 'default'
) => {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    let newwData = data;
    if (text) {
      newwData = addChunk(newwData, createChunk(CHUNK_NAMES.TEXT, Buffer.from(text), key));
    }
    if (buffer) {
      const chunkOptions = createChunk(CHUNK_NAMES.OPTIONS, Buffer.from(JSON.stringify(options)), key);
      newwData = addChunk(newwData, createChunk(CHUNK_NAMES.IMG, Buffer.concat([chunkOptions, buffer]), key));
    }
    fs.writeFile(newPath, newwData, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
  });
};

const searchText = (data, key) => {
  const start = data.indexOf(CHUNK_NAMES.TEXT) - 4;
  if (start > 0) {
    const len = data.readInt32BE(start);
    const _buffer = data.slice(start + 8, start + 8 + len);
    return decode(_buffer, key).toString('utf8');
  }

  return null;
};

const searchImage = (data, key) => {
  const start = data.indexOf(CHUNK_NAMES.IMG) - 4;
  if (start > 0) {
    const len = data.readInt32BE(start);
    const lenOptions = data.readInt32BE(start + 8);
    const _opts = decode(data.slice(start + 16, start + 16 + lenOptions), key).toString('utf8') || '{}';
    const _buffer = decode(data.slice(start + lenOptions + 20, start + 8 + len), key);

    return {
      ...JSON.parse(_opts),
      data: _buffer,
    };
  }

  return null;
};

const decodePNGFile = (path, key = 'default') => {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    const dataImg = searchImage(data, key);
    if (dataImg)
      fs.writeFile(dataImg.filename, dataImg.data, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('The file was saved!');
      });
    console.log('text:', searchText(data, key));
    console.log('img:', dataImg);
  });
};

module.exports = {
  addChunk,
  createChunk,
  writeNewPNGFile,
  decodePNGFile,
};
