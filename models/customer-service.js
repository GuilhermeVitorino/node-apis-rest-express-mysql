const moment = require('moment');
const connection = require('../infra/connection')

class CustomerService {
    add(customerService, res) {
        const creation_date = moment().format('YYYY-MM-DD HH:MM:ss')
        const date = moment(customerService.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:ss')
        const customerServiceDated = {...customerService, creation_date, date }
        const sql = 'INSERT INTO customer_service SET ?'
        connection.query(sql, customerServiceDated, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(result)
            }
        })
    }
}

module.exports = new CustomerService