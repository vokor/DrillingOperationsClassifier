import React, { Component } from 'react';

import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomerCreateUpdate extends Component {
    constructor(props) {
        super(props);
    
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          customersService.getCustomer(params.pk).then((c)=>{
            this.refs.date.value = c.date;
            this.refs.begin_time.value = c.begin_time;
            this.refs.end_time.value = c.end_time;
            this.refs.bit_begin.value = c.bit_begin;
            this.refs.bit_end.value = c.bit_end;
            this.refs.candles.value = c.candles;
            this.refs.operation.value = c.operation;
            this.refs.tech_parameters.value = c.tech_parameters;
            this.refs.bottomhole_begin.value = c.bottomhole_begin;
            this.refs.bottomhole_end.value = c.bottomhole_end;
            this.refs.source_name.value = c.source_name;
          })
        }
      }

      handleCreate(){
        customersService.createCustomer(
          {
            "date": this.refs.date.value,
            "begin_time": this.refs.begin_time.value,
            "end_time": this.refs.end_time.value,
            "bit_begin": this.refs.bit_begin.value,
            "bit_end": this.refs.bit_end.value,
            "candles": this.refs.candles.value,
            "operation": this.refs.operation.value,
            "tech_parameters": this.refs.tech_parameters.value,
            "bottomhole_begin": this.refs.bottomhole_begin.value,
            "bottomhole_end": this.refs.bottomhole_end.value,
            "source_name": this.refs.source_name.value
        }          
        ).then((result)=>{
          alert("Customer created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        customersService.updateCustomer(
          {
            "pk": pk,
            "date": this.refs.date.value,
            "begin_time": this.refs.begin_time.value,
            "end_time": this.refs.end_time.value,
            "bit_begin": this.refs.bit_begin.value,
            "bit_end": this.refs.bit_end.value,
            "candles": this.refs.candles.value,
            "operation": this.refs.operation.value,
            "tech_parameters": this.refs.tech_parameters.value,
            "bottomhole_begin": this.refs.bottomhole_begin.value,
            "bottomhole_end": this.refs.bottomhole_end.value,
            "source_name": this.refs.source_name.value
        }          
        ).then((result)=>{
          console.log(result);
          alert("Customer updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Date:</label>
              <input className="form-control" type="text" ref='date' />
            
            <label>
              Begin Time:</label>
              <input className="form-control" type="text" ref='begin_time'/>
            
            <label>
              End Time:</label>
              <input className="form-control" type="text" ref='end_time' />
            
            <label>
              Bit Depth Begin:</label>
              <input className="form-control" type="text" ref='bit_begin' />
            
            <label>
              Bit Depth End:</label>
              <input className="form-control" type="text" ref='bit_end' />
            
            <label>
              Candles:</label>
              <input className="form-control" type="text" ref='candles' />

              <label>
              Operation:</label>
              <input className="form-control" type="text" ref='operation' />

              <label>
              Tech Parameters:</label>
              <input className="form-control" type="text" ref='tech_parameters' />

              <label>
              Bottomhole Begin:</label>
              <input className="form-control" type="text" ref='bottomhole_begin' />

              <label>
              Bottomhole End:</label>
              <input className="form-control" type="text" ref='bottomhole_end' />

              <label>
              Source:</label>
              <input className="form-control" type="text" ref='source_name' />
              

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default CustomerCreateUpdate;