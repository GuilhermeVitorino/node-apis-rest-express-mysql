const axios = require('axios')
const moment = require('moment')
const connection = require('../infra/database/connection')
const repository = require('../repositories/customer-service')

class CustomerService {

  constructor() {

    this.dateIsValid = (date, creation_date) => moment(date).isSameOrAfter(creation_date)
    this.customerIsValid = (size) => size > 5

    this.validates = params => {
      this.validations.filter(field => {
        const { name } = field
        const param = params[name]

        return !field.valid(param)
      })
    }

    this.validations = [{
      name: 'date',
      valid: this.dateIsValid,
      message: 'date must be greater than or equal current date'
    },
    {
      name: 'customer',
      valid: this.customerIsValid,
      message: 'customer must be have length greater than 5 characters'
    }
    ]


  }

  add(customerService) {
    const creation_date = moment().format('YYYY-MM-DD HH:mm:ss')
    const date = moment(customerService.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

    const params = {
      date: { date, creation_date },
      customer: { size: customerService.customer.length }
    }

    const errors = this.validates(params)
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

  list() {
    return repository.list()
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