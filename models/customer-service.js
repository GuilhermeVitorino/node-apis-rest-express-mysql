const moment = require('moment');
const connection = require('../infra/connection')

class CustomerService {
    add(customerService) {
        const creation_date = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(customerService.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const customerServiceDated = {...customerService, creation_date, date }
        const sql = 'INSERT INTO customer_service SET ?'
        connection.query(sql, customerServiceDated, (erro, result) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log(result)
            }
        })
    }
}

module.exports = new CustomerService