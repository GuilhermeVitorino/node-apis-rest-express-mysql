const CustomerService = require('../models/customer-service')

module.exports = app => {
    app.get('/customer-service', (req, res) => res.send('you are in customer service section [get]'))

    app.post('/customer-service', (req, res) => {
        const customerService = req.body
        CustomerService.add(customerService, res)
    })
}