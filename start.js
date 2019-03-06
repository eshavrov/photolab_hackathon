const crc32 = require('./utils/crc32');

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

console.log(pngSignature);

const buf = Buffer.from([0x49, 0x45, 0x4e, 0x44]);

console.log(crc32(buf), ' === AE 42 60 82');
