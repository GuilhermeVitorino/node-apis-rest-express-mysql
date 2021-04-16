const axios = require('axios')
const moment = require('moment')
const connection = require('../infra/database/connection')
const repository = require('../repositories/customer-service')

class CustomerService {

  add(customerService) {
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

      return new Promise((resolve, reject) => reject(errors))

    } else {

      const customerServiceDated = { ...customerService, creation_date, date }

      return repository.add(customerServiceDated)
        .then(results => {
          const id = results.insertId
          return { ...customerService, id }
        })
    }
  }

  list(res) {
    const sql = 'SELECT * FROM customer_service'

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json(result)
      }
    })
  }

  listById(res, id) {
    const sql = `SELECT * FROM customer_service WHERE id = ${id}`

    connection.query(sql, async (error, result) => {

      const customer_service = result[0];
      const cpf = customer_service.customer

      if (error) {
        res.status(400).json(erro)
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        customer_service.customer = data
        res.status(200).json(customer_service)
      }
    })
  }

  update(id, values, res) {

    if (values.date) {
      values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }

    const sql = `UPDATE customer_service SET ? WHERE id = ?`

    connection.query(sql, [values, id], (error, result) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json({ ...values, id })
      }
    })
  }

  delete(id, res) {

    const sql = `DELETE FROM customer_service WHERE id = ?`

    connection.query(sql, id, (error, result) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json({ id })
      }
    })
  }
}

module.exports = new CustomerService