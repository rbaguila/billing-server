import React, { Component } from "react";
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import PDFButton from "./PDFButton";
import { Icon, Menu, Table } from 'semantic-ui-react';

class CarriersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeItem: 1,
      itemPerPage: 5
    };
    this.title = this.props.title;
    this.url = this.props.url;
    this.fetchCarriers = this.fetchCarriers.bind(this);
    this.fetchCarrierById = this.fetchCarrierById.bind(this);
    this.setCarrier = this.setCarrier.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemClickRight = this.handleItemClickRight.bind(this);
    this.handleItemClickLeft = this.handleItemClickLeft.bind(this);
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
  
  handleItemClick = (e, {name}) => {
    console.log(name);
    // const item = parseInt(name, 10)
    this.setState({ activeItem: name }) 
  }
  
  handleItemClickRight = (e) => {
    const item = this.state.activeItem + 1;
    this.setState({ activeItem: item })
  }
  
  handleItemClickLeft = (e) => {
    const item = this.state.activeItem - 1;
    this.setState({ activeItem: item })
  }
  
  componentDidMount() {
   this.fetchCarriers();
  }
  
  render() {
    const { activeItem, itemPerPage } = this.state;
    
    const indexOfLast = activeItem * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const currentData = this.state.data.slice(indexOfFirst, indexOfLast);
    
    let carrierRows = currentData.map(carrier => {
      return (
      <Table.Row key={carrier.id}>
        <Table.Cell>{carrier.name}</Table.Cell>
        <Table.Cell>{carrier.description}</Table.Cell>
        <Table.Cell className="collapsing right aligned">
          
          <EditForm 
            carrierId = {carrier.id}
            carrierName = {carrier.name}
            carrierDescription = {carrier.description}
            onUpdate = { this.handleUpdate }
          />
          <i aria-hidden="true" className="delete large icon action-button"
            onClick={() => this.handleDelete(carrier.id)}></i>
        </Table.Cell>
      </Table.Row>
      )
    })
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.data.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log("ACTIVE: "+activeItem);
    const renderPageNumbers = pageNumbers.map(number => {
      console.log("NUMBER: "+number);
      return (
        <Menu.Item 
          key={number}
          name={""+number+""}
          active={activeItem == number} 
          onClick={this.handleItemClick}>
          {number}
        </Menu.Item>
      );
    });
    
    return (
      <Table basic>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='1'><h3>{this.title}</h3></Table.HeaderCell>
          <Table.HeaderCell colSpan='1' className="right aligned">
            <PDFButton
              title = "Download PDF"
              url = {this.url}
            />
          </Table.HeaderCell>
          <Table.HeaderCell colSpan='1' className="right aligned">
            <AddForm
              title = "Add"
              url = {this.url}
              onSubmit = { this.handleSubmit }
            />
          </Table.HeaderCell>
        </Table.Row>
         <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {carrierRows}
      </Table.Body>

      <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' onClick={this.handleItemClickLeft} icon>
              <Icon name='left chevron' />
            </Menu.Item>
            {renderPageNumbers}
            <Menu.Item  as='a' onClick={this.handleItemClickRight} icon>
              <Icon name='right chevron' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
      </Table.Footer>
    </Table>
    )
  }
}


export default CarriersTable;