import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter
} from 'reactstrap'

const ActionButton = (props) => {
  return (
    <Button
      outline={props.outlineButton}
      color={props.colorButton}
      className={props.className}
      onClick={props.onClickButton}
    >
      {props.titleButton}
    </Button>
  )
}

const ActionInput = (props) => {
  return (
    <Input
      type={props.type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      className={props.className}
      onChange={(e) => props.onChangeInput(e)}
    />
  )
}

class ActionModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalVisible: false
    }
  }

  render () {
    return (
      <Modal
        isOpen={this.state.isModalVisible}
        toggle={() => this.onToggleModal()}
      >
        {this.renderModalHeader()}
        {this.renderModalBody()}
        {this.renderModalFooter()}
      </Modal>
    )
  }

  onToggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible
    }))
  }

  renderModalHeader = () => {
    return (
      <ModalHeader toggle={() => this.onToggleModal()}>
        {this.props.titleModalHeader}
      </ModalHeader>
    )
  }

  renderModalBody = () => {
    return (
      <ModalBody>
        <Form>
          {this.props.inputDataModal.map((item, index) => {
            return this.renderFormGroup(item, index)
          })}
        </Form>
      </ModalBody>
    )
  }

  renderFormGroup = (props, index) => {
    return (
      <FormGroup key={index}>
        <Label for={props.name}>{props.label}</Label>
        <ActionInput {...props} />
      </FormGroup>
    )
  }

  renderModalFooter = () => {
    return (
      <ModalFooter>
        {this.props.buttonModal.map((item, index) => {
          return (
            <ActionButton
              key={index}
              outlineButton={item.outlineButton}
              colorButton={item.colorButton}
              titleButton={item.titleButton}
              onClickButton={() => {
                item.onClickButton()
                this.onToggleModal()
              }}
            />
          )
        })}
      </ModalFooter>
    )
  }
}

ActionButton.propTypes = {
  outlineButton: PropTypes.bool,
  colorButton: PropTypes.string,
  titleButton: PropTypes.string,
  className: PropTypes.string,
  onClickButton: PropTypes.func
}

ActionInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChangeInput: PropTypes.func
}

ActionModal.propTypes = {
  titleModalHeader: PropTypes.string,
  inputDataModal: PropTypes.array,
  buttonModal: PropTypes.array
}

export {
  ActionButton,
  ActionInput,
  ActionModal
}
