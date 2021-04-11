module.exports = app => {
    app.get('/customer-service', (req, res) => res.send('you are in customer service section'))
}