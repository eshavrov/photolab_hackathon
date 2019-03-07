const rp = require('request-promise');
const fs = require('fs');

/**
 * curl -v -X POST "http://upload-soft.photolab.me/upload.php" \
  -F file1=@./girl.jpg \
  -F no_resize=1
 */

const options = {
  method: 'POST',
  uri: 'http://upload-soft.photolab.me/upload.php',
  formData: {
    no_resize: 1,
    file1: {
      value: fs.createReadStream('./new_sticker.png'),
      options: {
        filename: 'new_sticker.png',
        contentType: 'image/png',
      },
    },
  },
};

rp(options)
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log('error ', err));
