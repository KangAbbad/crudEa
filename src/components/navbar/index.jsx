import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <Router>
      <nav className='navbar navbar-expand-lg navbar-light bg-light rounded'>
        <button
          className='btn btn-default btn-info'
          data-toggle='modal'
          data-target='#exampleModal'
          onClick={() => props.buttonTambahSantri()}
        >
          <i className='fa fa-user-plus' /> Tambah santri
        </button>

        {/* MODAL */}
        <div className='modal fade' id='exampleModal' tabIndex='-1' role='dialog' aria-labelledby='Updatedata' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title text-dark' id='Updatedata'>Tambah Santri</h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body text-dark'>
                <label htmlFor='exampleInputEmail1'>Nama Santri</label>
                <input
                  type='email'
                  className='form-control'
                  aria-describedby='emailHelp'
                  placeholder='Nama Santri..'
                  name='name'
                  onChange={props.onHandleInput}
                  value={props.postDataSantri.name}
                />
                <label htmlFor='exampleInputEmail1' className='mt-4'>Jurusan</label>
                <input
                  type='email'
                  className='form-control'
                  aria-describedby='emailHelp'
                  placeholder='Jurusan..'
                  name='username'
                  onChange={props.onHandleInput}
                  value={props.postDataSantri.username}
                />
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={() => props.simpanDataSantri()}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FORM INPUT */}
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav'>
            <li className='nav-item '>
              <Link to='/Data_Santri' className='nav-link'> Data Santri </Link>
            </li>
            <li className='nav-item'>
              <Link to='/Aktifitas_Santri' className='nav-link'>Aktifitas Santri</Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>Home</Link>
            </li>
          </ul>
          <ul className='m-2 ml-auto'>
            <li className='navbar-item ml-auto'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
                onChange={() => props.searchedSantri()}
              />
            </li>
          </ul>
        </div>
      </nav>
    </Router>
  )
}

Navbar.propTypes = {
  buttonTambahSantri: PropTypes.func,
  onHandleInput: PropTypes.func,
  postDataSantri: PropTypes.object,
  simpanDataSantri: PropTypes.func,
  searchedSantri: PropTypes.func
}

export default Navbar
