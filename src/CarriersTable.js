import React, { Component } from "react";


class CarriersTable extends Component {
  render() {
    let carrierRows = this.props.data.map(carrier => {
      return (
      <tr key={carrier.id}>
        <td>{carrier.name}</td>
        <td>{carrier.description}</td>
        <td className="collapsing right aligned">
          <i aria-hidden="true" className="unhide large icon action-button"></i>
          <i aria-hidden="true" className="edit large icon action-button"></i>
          <i aria-hidden="true" className="delete large icon action-button"></i>
        </td>
      </tr>
      )
    })
    return (
      <table className="ui selectable structured large table">
        <thead>
          <tr>
            <th colSpan="2">
              <h3>Carriers</h3>
            </th>
            <th colSpan="1" className="right aligned">
              <button className="ui green basic button">Add</button>
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