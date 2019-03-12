const rp = require('request-promise');

/**
 * curl -v -X POST "http://api-soft.photolab.me/template_process.php" \
    -F image_url[1]=http://soft.photolab.me/samples/girl.jpg \
    -F rotate[1]=0 \
    -F flip[1]=0 \
    -F crop[1]=0,0,1,1 \
    -F template_name="SOME_TEMPLATE_NAME"
 */

const options = {
  method: 'POST',
  uri: 'http://api-soft.photolab.me/template_process.php',
  formData: {
    'image_url[1]': 'http://temp-images.ws.pho.to/accc172ca6cc1da836b27ba367f3566d3a8db540.png',
    'rotate[1]': 0,
    'flip[1]': 0,
    'crop[1]': '0,0,1,1',
    template_name: 1071, // id шаблона из таблички http://soft.photolab.me/list-templates
  },
};

rp(options)
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log('error ', err));
