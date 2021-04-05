import React, { Component } from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomersList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      nextPageURL: ''

    };
    this.nextPage = this.nextPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    
  }  
  componentDidMount() {
    var self = this;
    customersService.getCustomers().then(function (result) {
      console.log(result);
      self.setState({ customers: result.data, nextPageURL: result.nextlink})
    });
  }

  handleDelete(e,pk){

    var self = this;
    customersService.deleteCustomer({pk : pk}).then(()=>{
      var newArr = self.state.customers.filter(function(obj) {
        return obj.pk !== pk;
      });

      self.setState({customers: newArr})
    });
    
  }
  
  nextPage(){
    var self = this;
    console.log(this.state.nextPageURL);
    customersService.getCustomersByURL(this.state.nextPageURL).then((result) => {

      self.setState({ customers: result.data, nextPageURL: result.nextlink})

    });      
    
  }

  render() {
    return (
      <div className="customers--list">
          <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Начало (время)</th>
            <th>Окончание (время)</th>
            <th>Длительность (мин)</th>
            <th>Глубина долота на начало операции</th>
            <th>Глубина долота на окончание операции</th>
            <th>Количество свечей</th>
            <th>Операция</th>
            <th>Тех. параметры</th>
            <th>Глубина забоя на начало операции</th>
            <th>Глубина забоя на окончание операции</th>
            <th>Источник</th>
          </tr>
          </thead>

            <tbody>
            {this.state.customers.map( c =>

              <tr key={c.pk}>
                <td>{c.pk} </td>
                <td>{c.date}</td>
                <td>{c.begin_time}</td>
                <td>{c.end_time}</td>
                <td>{c.bit_begin}</td>
                <td>{c.bit_end}</td>
                <td>{c.candles}</td>
                <td>{c.operation}</td>
                <td>{c.tech_parameters}</td>
                <td>{c.bottomhole_begin}</td>
                <td>{c.bottomhole_end}</td>
                <td>{c.source_name}</td>
                <td>
                <button  onClick={(e)=> this.handleDelete(e,c.pk) }> Delete</button>
                <a  href={"/customer/" + c.pk}> Update</a> 
                </td>
              </tr>)}
              </tbody>
          </table>  
          <button className="btn btn-primary" onClick= { this.nextPage }>Next</button>

      </div>
    );
  }
}

export default CustomersList;
