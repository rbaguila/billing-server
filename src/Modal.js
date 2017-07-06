import React, { Component } from 'react'
import axios from 'axios'
import { Button, Header, Modal, Form } from 'semantic-ui-react'

class ModalAction extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button onClick={this.show(true)} inverted color='green'>{this.props.title}</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon='close'>
          
              <Modal.Header>Add a Carrier</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                <Form>
                    <Form.Field>
                      <label>Name</label>
                      <input placeholder='Name' />
                    </Form.Field>
                    <Form.Field>
                      <label>Description</label>
                      <input placeholder='Description' />
                    </Form.Field>
                    <Button type='submit' color='green' content="Save" onClick={this.close} />
                    <Button color='red' onClick={this.close} content="Discard"/>
                 </Form>
                </Modal.Description>
              </Modal.Content>
              
        </Modal>
      </div>
    )
  }
}

export default ModalAction;
