import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from 'reactstrap'
import {
  ActionButton,
  ActionModal,
  ActionInput
} from '../action'

class MenuBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isNavbarVisible: false,
      inputDataModal: [
        {
          label: 'Nama Santri',
          type: 'text',
          name: 'name',
          id: 'name',
          placeholder: 'masukkan nama',
          value: props.postDataSantri.name,
          onChangeInput: props.onHandleInput
        },
        {
          label: 'Jurusan',
          type: 'text',
          name: 'studyProgram',
          id: 'studyProgram',
          placeholder: 'masukkan jurusan',
          value: props.postDataSantri.studyProgram,
          onChangeInput: props.onHandleInput
        },
        {
          label: 'Lulusan',
          type: 'text',
          name: 'lulusan',
          id: 'lulusan',
          placeholder: 'masukkan lulusan',
          value: '',
          onChangeInput: props.onHandleInput
        }
      ],
      buttonModal: [
        {
          outlineButton: false,
          colorButton: 'info',
          titleButton: 'Tambah',
          onClickButton: props.onHandlePost
        },
        {
          outlineButton: true,
          colorButton: 'secondary',
          titleButton: 'Batal',
          onClickButton: () => {}
        },
        {
          outlineButton: false,
          colorButton: 'danger',
          titleButton: 'Custom Button',
          onClickButton: () => {}
        }
      ]
    }
  }

  onToggleNavbar = () => {
    this.setState(prevState => ({
      isNavbarVisible: !prevState.isNavbarVisible
    }))
  }

  render () {
    return (
      <div className='container-fluid'>
        <Navbar
          color='light'
          light
          expand='md'
          className='rounded'
        >
          {/* ADD BUTTON */}
          <ActionButton
            titleButton='Tambah Santri'
            colorButton='info'
            onClickButton={() => this.actionModal.onToggleModal()}
          />

          {/* MODAL */}
          <ActionModal
            ref={ref => { this.actionModal = ref }}
            titleModalHeader='Tambah Data Santri'
            inputDataModal={this.state.inputDataModal}
            buttonModal={this.state.buttonModal}
            postDataSantri={this.props.postDataSantri}
            onHandleInput={this.props.onHandleInput}
            onHandlePost={this.props.onHandlePost}
          />

          {/* FORM INPUT */}
          <NavbarToggler onClick={() => this.onToggleNavbar()} />
          <Collapse isOpen={this.state.isNavbarVisible} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <ActionInput
                  type='search'
                  placeholder='cari santri'
                  className='form-control mr-sm-2'
                  value={this.props.value}
                  onChangeInput={this.props.onSearchSantri}
                />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

MenuBar.propTypes = {
  postDataSantri: PropTypes.object,
  value: PropTypes.string,
  onHandleInput: PropTypes.func,
  onHandlePost: PropTypes.func,
  onSearchSantri: PropTypes.func
}

export default MenuBar
