import React from 'react'
import PropTypes from 'prop-types'
import {
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

const PaginationButton = (props) => {
  return (
    <Pagination
      aria-label='Page navigation example'
      size='sm'
      className='d-flex justify-content-end container-fluid'
    >
      <PaginationItem disabled={props.currentPage <= 1}>
        <PaginationLink onClick={props.onPreviousPage}>
          Previous
        </PaginationLink>
      </PaginationItem>

      {props.paginationNumbers.map((item, index) => (
        <PaginationItem
          key={index}
          active={props.currentPage === item}
        >
          <PaginationLink
            id={item}
            onClick={(event) => this.onMovePage(event)}
          >
            {item}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={props.currentPage === props.paginationNumbers.length}>
        <PaginationLink onClick={props.onNextPage}>
          Next
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  )
}

PaginationButton.propTypes = {
  currentPage: PropTypes.number,
  paginationNumbers: PropTypes.array,
  onPreviousPage: PropTypes.func,
  onNextPage: PropTypes.func
}

export default PaginationButton
