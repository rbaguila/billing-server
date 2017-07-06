import React, { Component } from 'react';
import './App.css';
import CarriersTable from "./CarriersTable";

const url='http://54.169.167.121:8081/api/carriers';

class App extends Component {
  
  render() {
    // const { listOfCarriers } = this.state;
    return (
      <div className="App">
        <div className="ui text container">
          <CarriersTable
            title="Carriers"
            url={ url }
            
          />
        </div>
      </div>
    );
  }
}

export default App;
