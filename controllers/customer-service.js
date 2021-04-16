const CustomerService = require('../models/customer-service')

module.exports = app => {
  app.get('/customer-service', (req, res) => {
    CustomerService.list(res)
  })

  app.get('/customer-service/:id', (req, res) => {
    const id = parseInt(req.params.id)
    CustomerService.listById(res, id)
  })

  app.post('/customer-service', (req, res) => {
    const customerService = req.body
    CustomerService.add(customerService)
      .then(data => res.status(201).json(data))
      .catch(error => res.status(400).json(error))
  })

  app.patch('/customer-service/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const values = req.body

    CustomerService.update(id, values, res)
  })

  app.delete('/customer-service/:id', (req, res) => {

    const id = parseInt(req.params.id)

    CustomerService.delete(id, res)
  })
}