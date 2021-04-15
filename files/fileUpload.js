const fs = require('fs')

module.exports = (path, fileName, callbackCreatedImage) => {

  const newPath = `./assets/images/${fileName}`

  fs.createReadStream(path)
  .pipe(fs.createWriteStream(newPath))
  .on('finish', () => callbackCreatedImage(newPath))
}