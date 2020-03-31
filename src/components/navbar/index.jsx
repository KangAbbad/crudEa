import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label
} from 'reactstrap'

const MenuBar = (props) => {
  // Buat toggle navbar
  const [isNavbarVisible, setNavbarOpen] = useState(false)
  const onToggleNavbar = () => setNavbarOpen(!isNavbarVisible)

  // Buat toggle modal
  const [isCreateModalVisible, setCreateModal] = useState(false)
  const onToggleCreateModal = () => setCreateModal(!isCreateModalVisible)

  return (
    <div className='container-fluid'>
      <Navbar
        color='light'
        light
        expand='md'
        className='rounded'
      >
        <Button
          color='info'
          onClick={onToggleCreateModal}
        >
          Tambah santri
        </Button>

        {/* MODAL */}
        <Modal
          isOpen={isCreateModalVisible}
          toggle={onToggleCreateModal}
        >
          <ModalHeader toggle={onToggleCreateModal}>
            Tambah Santri
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for='name'>Nama Santri</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='nama lengkap'
                  value={props.postDataSantri.name}
                  onChange={(e) => props.onHandleInput(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for='studyProgram'>Jurusan</Label>
                <Input
                  type='text'
                  name='studyProgram'
                  id='studyProgram'
                  placeholder='program studi'
                  value={props.postDataSantri.studyProgram}
                  onChange={(e) => props.onHandleInput(e)}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color='info'
              onClick={() => {
                props.onHandlePost()
                onToggleCreateModal()
              }}
            >
              Simpan
            </Button>
            <Button
              outline
              color='secondary'
              onClick={onToggleCreateModal}
            >
              Batal
            </Button>
          </ModalFooter>
        </Modal>

        {/* FORM INPUT */}
        <NavbarToggler onClick={onToggleNavbar} />
        <Collapse isOpen={isNavbarVisible} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Input
                type='search'
                placeholder='cari santri'
                className='form-control mr-sm-2'
                value={props.value}
                onChange={(e) => props.onSearchSantri(e)}
              />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

MenuBar.propTypes = {
  postDataSantri: PropTypes.object,
  value: PropTypes.string,
  onHandleInput: PropTypes.func,
  onHandlePost: PropTypes.func,
  onSearchSantri: PropTypes.func
}

export default MenuBar
