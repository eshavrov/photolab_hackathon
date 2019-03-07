var fs = require('fs');
const crc32 = require('./utils/crc32');
const writeNewPNGFile = require('./src').writeNewPNGFile;

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

console.log(pngSignature);

const buf = Buffer.from([0x49, 0x45, 0x4e, 0x44]);

console.log(crc32(buf), ' === AE 42 60 82');

writeNewPNGFile('./stickers/sticker_vk_starwars_004.png', './new_sticker.png', {
  text: 'hello world',
});
