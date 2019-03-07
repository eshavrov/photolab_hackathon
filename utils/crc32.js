/* Вычисляем контрольную сумму CRC-32 соглассно официальной спецификации */
// https://www.w3.org/TR/PNG/#D-CRCAppendix

const POLYNOM = 0xedb88320;

const CRC_TABLE = Array.from({ length: 256 }, (_, c) => {
  for (let i = 8; i--; ) {
    c = c & 1 ? POLYNOM ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});

const crc32 = buf => {
  const crc = buf.reduce((crc, byte) => CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8), -1) ^ -1;
  const tmp = Buffer.allocUnsafe(4);
  return tmp.writeInt32BE(crc, 0), tmp;
};

module.exports = crc32;
