const fs = require('fs')

fs.readFile('./assets/dog.jpg', (error, buffer) => {
  console.log('image was bufferized')
  console.log(buffer)

  fs.writeFile('./assets/new_dog.jpg', buffer, (error) => {
    console.log('image was written')
  })
})