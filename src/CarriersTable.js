import React, { Component } from "react";
import fetch from 'isomorphic-fetch';
import axios from 'axios';
// import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
// import ModalAction from "./Modal";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import PDFButton from "./PDFButton";

class CarriersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.title = this.props.title;
    this.url = this.props.url;
    this.fetchCarriers = this.fetchCarriers.bind(this);
    this.fetchCarrierById = this.fetchCarrierById.bind(this);
    this.setCarrier = this.setCarrier.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  
  fetchCarriers(){
  
    axios.get(this.url)
      .then(res => {
      this.setState({ data: res.data });
      })
  }
  
  fetchCarrierById(id) {
    fetch(this.url+`/`+id)
      .then(response => response.json())
      .then(result => this.setCarrier(result));
  }
  
  setCarrier(result){
    console.log(result);
  }
  
  handleSubmit(carrier) {
    const self = this;
    let carriers = this.state.data;
    let newCarriers = carriers.concat([carrier]);
    
    axios.post(this.url, carrier)
      .then(function(response){
        console.log(response);
        self.setState({ data: newCarriers });
        // console.log(response);
      })
      .catch(err => {
        console.error(err);
        this.setState({ data: carriers });
      });
  }
  
  handleUpdate(id, carrier) {
    const self = this;
    let carriers = this.state.data;
    
    axios.put(`${this.props.url}/${id}`, carrier)
      .then(res => {
        
        // self.setState({ data: updatedCarriers });
        self.fetchCarriers();
        console.log('Successfully updated');
      })
      .catch(err => {
        console.log(err);
        this.setState({ data: carriers });
      })
  }
  
  handleDelete(id) {
    const self = this;
    let carriers = this.state.data;
    const isNotId = item => item.id !== id;
    const updatedCarriers = carriers.filter(isNotId);
    axios.delete(`${this.url}/${id}`)
      .then(res => {
        alert("Successfully deleted!")
        self.setState({ data: updatedCarriers });
        console.log('Successfully deleted');
      })
      .catch(err => {
        console.error(err);
        this.setState({ data: carriers });
      });
  }
  
  componentDidMount() {
   this.fetchCarriers();
  }
  
  render() {
    let carrierRows = this.state.data.map(carrier => {
      return (
      <tr key={carrier.id}>
        <td>{carrier.name}</td>
        <td>{carrier.description}</td>
        <td className="collapsing right aligned">
          <i aria-hidden="true" className="unhide large icon action-button" 
            onClick={() => this.fetchCarrierById(carrier.id)}></i>
          <EditForm 
            carrierId = {carrier.id}
            carrierName = {carrier.name}
            carrierDescription = {carrier.description}
            onUpdate = { this.handleUpdate }
          />
          <i aria-hidden="true" className="delete large icon action-button"
            onClick={() => this.handleDelete(carrier.id)}></i>
        </td>
      </tr>
      )
    })
    return (
      <table className="ui selectable structured large table">
        <thead>
          <tr>
            <th colSpan="1">
              <h3>{this.title}</h3>
            </th>
            <th colSpan="1" className="right aligned">
              <PDFButton
                title = "Download PDF"
                url = {this.url}
              />
            </th>
            
            <th colSpan="1" className="right aligned">
              <AddForm
                title = "Add"
                url = {this.url}
                onSubmit = { this.handleSubmit }
              />
            </th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th className="collapsing center aligned">Actions</th>
          </tr>
        </thead>
        <tbody>
          {carrierRows}
        </tbody>
        
      </table>
    )
  }
}


export default CarriersTable;