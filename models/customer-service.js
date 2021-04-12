const connection = require('../infra/connection')

class CustomerService {
    add(customerService) {
        const sql = 'INSERT INTO customer_service SET ?'
        connection.query(sql, customerService, (erro, result) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log(result)
            }
        })
    }
}

module.exports = new CustomerService