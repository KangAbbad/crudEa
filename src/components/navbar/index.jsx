/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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
          // valueInput: this.props.postDataSantri.name,
          onChangeInput: this.props.onHandleInput
        },
        {
          label: 'Jurusan',
          type: 'text',
          name: 'studyProgram',
          id: 'studyProgram',
          placeholder: 'masukkan jurusan',
          // valueInput: this.props.postDataSantri.studyProgram,
          onChangeInput: this.props.onHandleInput
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
        }
      ]
    }

    console.log('constructor')
    console.log(props.postDataSantri)
  }

  onToggleNavbar = () => {
    this.setState(prevState => ({
      isNavbarVisible: !prevState.isNavbarVisible
    }))
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('constructor')
    console.log(this.props.postDataSantri)
  }

  render () {
    const inputDataModal = [
      {
        label: 'Nama Santri',
        type: 'text',
        name: 'name',
        id: 'name',
        placeholder: 'masukkan nama',
        valueInput: this.props.postDataSantri.name,
        onChangeInput: this.props.onHandleInput
      },
      {
        label: 'Jurusan',
        type: 'text',
        name: 'studyProgram',
        id: 'studyProgram',
        placeholder: 'masukkan jurusan',
        valueInput: this.props.postDataSantri.studyProgram,
        onChangeInput: this.props.onHandleInput
      }
    ]

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
