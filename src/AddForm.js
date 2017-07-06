import React, { Component } from 'react'
// import axios from 'axios';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react'

class AddForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            name: '',
            description: ''
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        // this.submit = this.submit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // submit(){

    //     if(this.state.name === '' || this.state.description === ''){
    //         console.log("Fields cannot be empty");
    //         this.close();
    //     }else{
    //          axios.post(this.props.url, {
    //             name: this.state.name,
    //             description: this.state.description,
    //         }).then(function(response){
    //             // this.setState({ data: response });
    //             console.log(response);
    //         }).catch(function(error){
    //             console.log(error);
    //         });
    //     }
    //     //implement setUpdate
    //     // this.setUpdate(this.);
    //     this.close();

    // }
    
    handleSubmit(e) {
     e.preventDefault();
     let name = this.state.name.trim();
     let description = this.state.description.trim();
     if (!name || !description) {
        return;
     }
     this.props.onSubmit({ name: name, description: description });
     this.setState({ name: '', description: '' });
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
        <Modal trigger={<Button inverted color='green' onClick={this.open}>{this.props.title}</Button>} open={this.state.showModal}>
            <Header icon='add' content='Add a Carrier' />
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

export default AddForm;