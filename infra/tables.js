class Tables {

    init(connection) {
        this.connection = connection
        this.createCustomerService()
    }

    createCustomerService() {
        const sql = 'CREATE TABLE IF NOT EXISTS customer_service (id int NOT NULL AUTO_INCREMENT, customer varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, status varchar(20) NOT NULL, comments text, PRIMARY KEY(id))'

        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('table customer_service created!')
            }
        })
    }


}

module.exports = new Tables