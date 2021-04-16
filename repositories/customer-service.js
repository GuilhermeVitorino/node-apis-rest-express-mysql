const query = require('../infra/database/queries')

class CustomerService {

  add(customer_service){
    const sql = 'INSERT INTO customer_service SET ?'
    return query(sql, customer_service)
  }

  list(){
    const sql = 'SELECT * FROM customer_service'
    return query(sql)
  }
  
}

module.exports = new CustomerService()