const fs = require('fs')
const path = require('path')

module.exports = (filePath, fileName, callbackCreatedImage) => {

  const validsTypes = ['jpg', 'png', 'jpeg']
  const type = path.extname(filePath)
  const typeIsValid = validsTypes.indexOf(type.substring(1)) !== -1

  if (typeIsValid) {
    const newFilePath = `./assets/images/${fileName}${type}`
    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(newFilePath))
      .on('finish', () => callbackCreatedImage(false, newFilePath))
  } else {
    const error = 'Invalid type'
    callbackCreatedImage(error)
  }
}