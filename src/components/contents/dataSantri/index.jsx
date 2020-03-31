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

const renderDataSantri = (props) => {
  return props.searchedSantri && props.value
    ? props.newDataSantri
    : props.dataSantri
}

let idSantriToDelete

const DataSantri = (props) => {
  // Untuk modal edit
  const [isEditModalVisible, setEditModal] = useState(false)
  const onToggleEditModal = () => setEditModal(!isEditModalVisible)

  // Untuk modal delete
  const [isDeleteModalVisible, setDeleteModal] = useState(false)
  const onToggleDeleteModal = () => setDeleteModal(!isDeleteModalVisible)

  return (
    <Table className='text-white'>
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

      <tbody>
        {renderDataSantri(props).map((item, id) => (
          <tr key={id}>
            <th scope='row'>{item.id}</th>
            <td>{item.name}</td>
            <td>{item.studyProgram}</td>
            <td>
              <div className='row justify-content-center'>
                <Button
                  color='danger'
                  className='mr-2'
                  onClick={() => {
                    idSantriToDelete = item.id
                    onToggleDeleteModal()
                  }}
                >
                  Delete
                </Button>

                <Button
                  color='warning'
                  className='text-white'
                  onClick={() => {
                    props.onDataUpdate(item)
                    onToggleEditModal()
                  }}
                >
                  Edit
                </Button>
              </div>
            </td>
          </tr>
        ))}

        <Modal
          isOpen={isEditModalVisible}
          toggle={onToggleEditModal}
        >
          <ModalHeader toggle={onToggleEditModal}>
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
                onToggleEditModal()
                props.onHandleUpdate()
              }}
            >
              Update
            </Button>
            <Button
              outline
              color='secondary'
              onClick={onToggleEditModal}
            >
              Batal
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={isDeleteModalVisible}
          toggle={onToggleDeleteModal}
        >
          <ModalHeader toggle={onToggleDeleteModal}>
            Apakah anda yakin ingin menghapus data ini?
          </ModalHeader>
          <ModalFooter>
            <Button
              outline
              color='secondary'
              onClick={() => {
                onToggleDeleteModal()
                props.onHandleDelete(idSantriToDelete)
              }}
            >
              Delete
            </Button>
            <Button
              color='info'
              onClick={onToggleDeleteModal}
            >
              Batal
            </Button>
          </ModalFooter>
        </Modal>
      </tbody>
    </Table>
  )
}

DataSantri.propTypes = {
  onDataUpdate: PropTypes.func,
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func
}

export default DataSantri
