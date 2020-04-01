import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

let idSantriToDelete

const DataSantri = (props) => {
  return (
    <Table className='text-white'>
      <Thead />
      <Tbody {...props} />
    </Table>
  )
}

const Thead = () => {
  return (
    <thead>
      <tr>
        <th
          scope='col'
          style={{ width: '20%' }}
        >
          ID
        </th>
        <th
          scope='col'
          style={{ width: '30%' }}
        >
          Nama
        </th>
        <th
          scope='col'
          style={{ width: '25%' }}
        >
          Jurusan
        </th>
        <th
          scope='col'
          className='text-center'
          style={{ width: '25%' }}
        >
          Action
        </th>
      </tr>
    </thead>
  )
}

const Tbody = (props) => {
  // Untuk modal edit
  const [isEditModalVisible, setEditModal] = useState(false)
  const onToggleEditModal = () => setEditModal(!isEditModalVisible)

  // Untuk modal delete
  const [isDeleteModalVisible, setDeleteModal] = useState(false)
  const onToggleDeleteModal = () => setDeleteModal(!isDeleteModalVisible)

  return (
    <tbody>
      {renderDataSantri(props).map((item, id) => (
        <tr key={id}>
          <th scope='row'>{item.id}</th>
          <td>{item.name}</td>
          <td>{item.studyProgram}</td>
          <td>
            <div className='row justify-content-center'>
              <ActionButton
                button='delete'
                onClick={() => {
                  idSantriToDelete = item.id
                  onToggleDeleteModal()
                }}
              />

              <ActionButton
                button='edit'
                onClick={() => {
                  props.onDataUpdate(item)
                  onToggleEditModal()
                }}
              />
            </div>
          </td>
        </tr>
      ))}

      <EditModal
        isEditModalVisible={isEditModalVisible}
        postDataSantri={props.postDataSantri}
        onToggleEditModal={onToggleEditModal}
        onHandleInput={props.onHandleInput}
        onHandleUpdate={props.onHandleUpdate}
      />

      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        onToggleDeleteModal={onToggleDeleteModal}
        onHandleDelete={props.onHandleDelete}
      />
    </tbody>
  )
}

const renderDataSantri = (props) => {
  return props.value
    ? props.newDataSantri
    : props.dataSantri
}

const EditModal = (props) => {
  return (
    <Modal
      isOpen={props.isEditModalVisible}
      toggle={() => props.onToggleEditModal()}
    >
      <ModalHeader toggle={() => props.onToggleEditModal()}>
        Update Data Santri
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='name'>Update Nama</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='nama santri'
              value={props.postDataSantri.name}
              onChange={(e) => props.onHandleInput(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for='studyProgram'>Update Jurusan</Label>
            <Input
              type='text'
              name='studyProgram'
              id='studyProgram'
              placeholder='jurusan santri'
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
            props.onToggleEditModal()
            props.onHandleUpdate()
          }}
        >
          Update
        </Button>
        <Button
          outline
          color='secondary'
          onClick={props.onToggleEditModal}
        >
          Batal
        </Button>
      </ModalFooter>
    </Modal>
  )
}

const DeleteModal = (props) => {
  return (
    <Modal
      isOpen={props.isDeleteModalVisible}
      toggle={() => props.onToggleDeleteModal()}
    >
      <ModalHeader className='justify-content-center border-0'>
        Apakah anda yakin ingin menghapus data ini?
      </ModalHeader>
      <ModalFooter className='border-0'>
        <Button
          outline
          color='secondary'
          onClick={() => {
            props.onToggleDeleteModal()
            props.onHandleDelete(idSantriToDelete)
          }}
        >
          Delete
        </Button>
        <Button
          color='info'
          onClick={props.onToggleDeleteModal}
        >
          Batal
        </Button>
      </ModalFooter>
    </Modal>
  )
}

const ActionButton = (props) => {
  const EditButton = props.button === 'edit'
  const DeleteButton = props.button === 'delete'

  const color = EditButton
    ? 'warning'
    : DeleteButton
      ? 'danger'
      : 'info'

  const className = EditButton
    ? 'text-white'
    : DeleteButton
      ? 'mr-2'
      : ''

  const title = EditButton
    ? 'Edit'
    : DeleteButton
      ? 'Delete'
      : 'Custom Button'

  return (
    <Button
      color={color}
      className={className}
      onClick={props.onClick}
    >
      {title}
    </Button>
  )
}

Tbody.propTypes = {
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onDataUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func
}

EditModal.propTypes = {
  isEditModalVisible: PropTypes.bool,
  postDataSantri: PropTypes.object,
  onToggleEditModal: PropTypes.func,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func
}

DeleteModal.propTypes = {
  isDeleteModalVisible: PropTypes.bool,
  onToggleDeleteModal: PropTypes.func,
  onHandleDelete: PropTypes.func
}

ActionButton.propTypes = {
  button: PropTypes.string,
  onClick: PropTypes.func
}

export default DataSantri
