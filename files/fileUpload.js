const fs = require('fs')

fs.createReadStream('./assets/dog.jpg')
  .pipe(fs.createWriteStream('./assets/dog-stream.jpg'))
  .on('finish', () => console.log('image was written with success'))