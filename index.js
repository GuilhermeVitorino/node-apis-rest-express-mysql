require('dotenv').config()
const connection = require('./infra/database/connection')
const customExpress = require('./config/customExpress')
const tables = require('./infra/database/tables')

connection.connect(erro => {
    if (erro) {
        console.log(erro);
    } else {
        console.log('database connected!')
        tables.init(connection)
        const app = customExpress()
        app.listen(3003, () => console.log('server running on port 3000'))
    }
})