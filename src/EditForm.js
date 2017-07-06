import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react';

class EditForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            name: this.props.carrierName,
            description: this.props.carrierDescription
        }
        
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
     e.preventDefault();
     let name = this.state.name.trim();
     let description = this.state.description.trim();
     if (!name || !description) {
        alert("Fields cannot be empty");
        return;
     }
     this.props.onUpdate(this.props.carrierId, { name: name, description: description });
     this.setState({ name: name, description: description });
     this.close();
    }
    open(){
        this.setState({ showModal: true});
    }

    close(){
        this.setState({ showModal: false});
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeDescription(event) {
        this.setState({ description: event.target.value });
    }
    
    render() {
    return (    
        <Modal trigger={<i aria-hidden="true" onClick={this.open} className="edit large icon action-button"></i>} open={this.state.showModal}>
            <Header icon='edit' content='Edit a Carrier' />
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input placeholder='Name' 
                    name = "name"
                    value = {this.state.name}
                    onChange = {this.onChangeName}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <input placeholder='Description' 
                    name = "description"
                    value = {this.state.description}
                    onChange = {this.onChangeDescription}
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={this.close}>
                <Icon name='remove' /> Discard
              </Button>
              <Button color='green' onClick={this.handleSubmit}>
                <Icon name='checkmark' /> Save
              </Button>
            </Modal.Actions>
          </Modal>
    )
  }
}

export default EditForm;