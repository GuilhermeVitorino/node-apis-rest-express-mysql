const query = require('../infra/database/queries')

class CustomerService {

  add(customer_service){
    const sql = 'INSERT INTO customer_service SET ?'
    return query(sql, customer_service)
  }
  
}

module.exports = new CustomerService()