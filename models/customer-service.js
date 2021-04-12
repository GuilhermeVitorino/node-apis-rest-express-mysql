const moment = require('moment');
const connection = require('../infra/connection')

class CustomerService {
    add(customerService, res) {
        const creation_date = moment().format('YYYY-MM-DD HH:mm:ss')
        const date = moment(customerService.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const dateIsValid = moment(date).isSameOrAfter(creation_date)
        const customerIsValid = customerService.customer.length > 5

        const validations = [{
                name: 'date',
                valid: dateIsValid,
                message: 'date must be greater than or equal current date'
            },
            {
                name: 'customer',
                valid: customerIsValid,
                message: 'customer must be have length greater than 5 characters'
            }
        ]

        const errors = validations.filter(field => !field.valid)
        const hasErrros = errors.length

        if (hasErrros) {

            res.status(400).json(errors)

        } else {

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
}

module.exports = new CustomerService