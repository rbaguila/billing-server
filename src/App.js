import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import CarriersTable from "./CarriersTable";

const url='http://54.169.167.121:3001/api/carriers';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.loadCarriers = this.loadCarriers.bind(this);
  }
  
  loadCarriers(){
  
    axios.get(url)
      .then(res => {
      this.setState({ data: res.data });
      })
  }
  
  componentDidMount() {
   this.loadCarriers();
  }
  
  
  render() {
    // const { listOfCarriers } = this.state;
    return (
      <div className="App">
        <div className="ui text container">
          <CarriersTable
            data={ this.state.data }
          />
        </div>
      </div>
    );
  }
}

export default App;
