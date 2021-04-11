require('dotenv').config()
const connection = require('./infra/connection')
const customExpress = require('./config/customExpress')

connection.connect(erro => {
    if (erro) {
        console.log(erro);
    } else {
        console.log('database connected!')
        const app = customExpress()
        app.listen(3000, () => console.log('server running on port 3000'))
    }
})