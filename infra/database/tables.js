class Tables {

    init(connection) {
        this.connection = connection
        this.createCustomerService()
        this.createPet()
    }

    createCustomerService() {
        const sql = 'CREATE TABLE IF NOT EXISTS customer_service (id int NOT NULL AUTO_INCREMENT, customer varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, date datetime NOT NULL, creation_date datetime NOT NULL, status varchar(20) NOT NULL, comments text, PRIMARY KEY(id))'

        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('table customer_service was created!')
            }
        })
    }

    createPet() {
      const query = 'CREATE TABLE IF NOT EXISTS pets(id int NOT NULL AUTO_INCREMENT, name varchar(50), image varchar(2000), PRIMARY KEY (id))'

      this.connection.query(query, error => {
        if(error) {
            console.log(error)
        } else {
            console.log('table pets was created')
        }
      })
    }


}

module.exports = new Tables