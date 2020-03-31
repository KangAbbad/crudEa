import React from 'react'
import PropTypes from 'prop-types'
import DataSantri from './dataSantri'
import PageNotFound from './page404'

const Contents = (props) => {
  return (
    <div className='container-fluid mt-3'>
      {props.dataSantri
        ? (
          <DataSantri
            value={props.value}
            dataSantri={props.dataSantri}
            newDataSantri={props.newDataSantri}
            postDataSantri={props.postDataSantri}
            onDataUpdate={props.onDataUpdate}
            onHandleInput={props.onHandleInput}
            onHandleUpdate={props.onHandleUpdate}
            onHandleDelete={props.onHandleDelete}
          />
        )
        : <PageNotFound />}
    </div>
  )
}

Contents.propTypes = {
  dataSantri: PropTypes.array,
  value: PropTypes.string,
  newDataSantri: PropTypes.array,
  onHandleUpdate: PropTypes.func,
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandleDelete: PropTypes.func,
  onDataUpdate: PropTypes.func
}

export default Contents
