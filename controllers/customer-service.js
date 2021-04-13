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
        CustomerService.add(customerService, res)
    })
}