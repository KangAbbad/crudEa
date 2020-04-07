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
let modalVisible

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
  const [isModalVisible, setModal] = useState(false)
  const onToggleModal = () => setModal(!isModalVisible)

  const isDeleteModalVisible = isModalVisible && modalVisible === 'delete'
  const isEditModalVisible = isModalVisible && modalVisible === 'edit'

  const actionButtonData = (item, id) => {
    return [
      {
        titleButton: 'Hapus',
        colorButton: 'danger',
        className: 'mr-2',
        onClick: () => {
          idSantriToDelete = id
          modalVisible = 'delete'
          onToggleModal()
        }
      },
      {
        titleButton: 'Ubah',
        colorButton: 'warning',
        className: '',
        onClick: () => {
          props.onDataUpdate(item)
          modalVisible = 'edit'
          onToggleModal()
        }
      }
    ]
  }

  return (
    <tbody>
      {renderDataSantri(props).map((item, id) => (
        <tr key={id}>
          <th scope='row'>{item.id}</th>
          <td>{item.name}</td>
          <td>{item.studyProgram}</td>
          <td>
            <div className='row justify-content-center'>
              {actionButtonData(item, item.id).map((itemBtn, index) => {
                return (
                  <ActionButton
                    key={index}
                    titleButton={itemBtn.titleButton}
                    colorButton={itemBtn.colorButton}
                    className={itemBtn.className}
                    onClick={() => itemBtn.onClick()}
                  />
                )
              })}

              {/* <ActionButton
                titleButton='Hapus'
                colorButton='danger'
                className='mr-2'
                onClick={() => {
                  idSantriToDelete = item.id
                  modalVisible = 'delete'
                  onToggleModal()
                }}
              /> */}

              {/* <ActionButton
                titleButton='Ubah'
                colorButton='warning'
                onClick={() => {
                  props.onDataUpdate(item)
                  modalVisible = 'edit'
                  onToggleModal()
                }}
              /> */}
            </div>
          </td>
        </tr>
      ))}

      <ActionModal
        isModalVisible={isDeleteModalVisible}
        onHandleDelete={props.onHandleDelete}
        onToggleModal={onToggleModal}
        name='Nama saya diko'
      />

      <ActionModal
        isModalVisible={isEditModalVisible}
        postDataSantri={props.postDataSantri}
        onHandleUpdate={props.onHandleUpdate}
        onHandleInput={props.onHandleInput}
        onToggleModal={onToggleModal}
        name='Nama saya abbad'
      />
    </tbody>
  )
}

const renderDataSantri = (props) => {
  return props.value
    ? props.newDataSantri
    : props.dataSantri
}

const ActionButton = (props) => {
  return (
    <Button
      outline={props.outlineButton}
      color={props.colorButton}
      className={props.className}
      onClick={props.onClick}
    >
      {props.titleButton}
    </Button>
  )
}

const ActionModal = (props) => {
  const EditModal = modalVisible === 'edit'
  const DeleteModal = modalVisible === 'delete'

  const titleHeader = EditModal
    ? 'Ubah Data Santri'
    : DeleteModal
      ? 'Apakah ingin menghapus santri?'
      : 'Salah passing modalVisible'

  const onToggleHeader = EditModal
    ? props.onToggleModal
    : DeleteModal
      ? null
      : () => {}

  const titleButton = EditModal
    ? 'Ubah'
    : DeleteModal
      ? 'Hapus'
      : 'Salah Button'

  const colorButtonLeft = EditModal
    ? 'info'
    : DeleteModal
      ? 'secondary'
      : 'success'

  const colorButtonRight = EditModal
    ? 'secondary'
    : DeleteModal
      ? 'info'
      : 'success'

  const onClick = EditModal
    ? () => {
      props.onToggleModal()
      props.onHandleUpdate()
    }
    : DeleteModal
      ? () => {
        props.onToggleModal()
        props.onHandleDelete(idSantriToDelete)
      }
      : () => {}

  const classNameDeleteModal = DeleteModal ? 'justify-content-center border-0' : ''

  return (
    <Modal
      isOpen={props.isModalVisible}
      toggle={() => props.onToggleModal()}
    >
      <ActionModalHeader
        classNameDeleteModal={classNameDeleteModal}
        titleHeader={titleHeader}
        onToggleHeader={onToggleHeader}
      />

      <ActionModalBody
        isBodyVisible={EditModal}
        postDataSantri={props.postDataSantri}
        onHandleInput={props.onHandleInput}
      />

      <ActionModalFooter
        classNameDeleteModal={classNameDeleteModal}
        titleButton={titleButton}
        colorButtonLeft={colorButtonLeft}
        colorButtonRight={colorButtonRight}
        outlineButtonLeft={DeleteModal}
        outlineButtonRight={EditModal}
        onClick={onClick}
        onToggleModal={props.onToggleModal}
      />
    </Modal>
  )
}

const ActionModalHeader = (props) => {
  return (
    <ModalHeader
      // eslint-disable-next-line react/jsx-handler-names
      toggle={props.onToggleHeader}
      className={props.classNameDeleteModal}
    >
      {props.titleHeader}
    </ModalHeader>
  )
}

const ActionModalBody = (props) => {
  if (props.isBodyVisible) {
    return (
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='name'>Nama Santri</Label>
            <Input
              onChange={props.onHandleInput}
              value={props.postDataSantri.name}
              type='text'
              name='name'
              id='name'
              placeholder='nama santri ...'
            />
          </FormGroup>

          <FormGroup>
            <Label for='name'>Jurusan</Label>
            <Input
              onChange={props.onHandleInput}
              value={props.postDataSantri.studyProgram}
              type='text'
              name='studyProgram'
              id='studyProgram'
              placeholder='jurusan santri ...'
            />
          </FormGroup>
        </Form>
      </ModalBody>
    )
  } else {
    return null
  }
}

const ActionModalFooter = (props) => {
  return (
    <ModalFooter className={props.classNameDeleteModal}>
      <ActionButton
        titleButton={props.titleButton}
        colorButton={props.colorButtonLeft}
        outlineButton={props.outlineButtonLeft}
        className='px-5'
        onClick={props.onClick}
      />

      <ActionButton
        titleButton='Batal'
        colorButton={props.colorButtonRight}
        outlineButton={props.outlineButtonRight}
        className='px-5'
        onClick={props.onToggleModal}
      />
    </ModalFooter>
  )
}

Tbody.propTypes = {
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onDataUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func
}

ActionButton.propTypes = {
  outlineButton: PropTypes.bool,
  colorButton: PropTypes.string,
  className: PropTypes.string,
  titleButton: PropTypes.string,
  onClick: PropTypes.func
}

ActionButton.defaultProps = {
  outlineButton: false,
  colorButton: 'success',
  className: '',
  titleButton: 'Custom Button',
  onClick: () => {}
}

ActionModal.propTypes = {
  isModalVisible: PropTypes.bool,
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func,
  onToggleModal: PropTypes.func
}

ActionModalHeader.propTypes = {
  onToggleHeader: PropTypes.func,
  classNameDeleteModal: PropTypes.string,
  titleHeader: PropTypes.string
}

ActionModalBody.propTypes = {
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func
}

ActionModalFooter.propTypes = {
  classNameDeleteModal: PropTypes.string,
  titleButton: PropTypes.string,
  outlineButtonLeft: PropTypes.bool,
  outlineButtonRight: PropTypes.bool,
  colorButtonLeft: PropTypes.string,
  colorButtonRight: PropTypes.string,
  onClick: PropTypes.func,
  onToggleModal: PropTypes.func
}

// FormModal.propTypes = {
//   name: PropTypes.string,
//   value: PropTypes.object,
//   onChange: PropTypes.func
// }

export default DataSantri
