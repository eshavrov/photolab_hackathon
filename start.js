var fs = require('fs');
const crc32 = require('./utils/crc32');
const writeNewPNGFile = require('./src').writeNewPNGFile;
const decodePNGFile = require('./src').decodePNGFile;

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

console.log(pngSignature);

const buf = Buffer.from([0x49, 0x45, 0x4e, 0x44]);

console.log(crc32(buf), ' === AE 42 60 82');

writeNewPNGFile('./stickers/sticker_vk_starwars_004.png', './new_sticker.png', {
  text: 'hello world',
});

fs.readFile('./stickers/sticker_vk_starwars_000.png', (err, data) => {
  if (err) throw err;
  writeNewPNGFile('./stickers/sticker_vk_starwars_001.png', './new_sticker_pic1.png', {
    options: {
      filename: 'sticker1.png',
      format: 'png',
    },
    buffer: data,
  });
});

fs.readFile('./stickers/sticker_vk_starwars_002.png', (err, data) => {
  if (err) throw err;
  writeNewPNGFile('./stickers/sticker_vk_starwars_003.png', './new_sticker_pic2.png', {
    buffer: data,
    options: {
      filename: 'sticker2.png',
      format: 'png',
    },
    text: 'test text',
  });
});

// decodePNGFile('./sticker_pic2.png');
