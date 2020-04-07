import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

class PaginationButton extends Component {
  render () {
    const prevButton = {
      disabled: this.isDisabledPrevious(),
      onClick: this.props.onPreviousPage,
      title: 'previous'
    }

    const nextButton = {
      disabled: this.isDisabledNext(),
      onClick: this.props.onNextPage,
      title: 'next'
    }

    return (
      <Pagination
        aria-label='Page navigation example'
        size='sm'
        className='d-flex justify-content-end container-fluid'
      >
        {this.renderActionButton(prevButton)}
        {this.renderPaginationButton()}
        {this.renderActionButton(nextButton)}
      </Pagination>
    )
  }

  renderActionButton = (props = { active: false, id: 'id-kosongan' }) => {
    return (
      <PaginationItem
        key={props.key}
        disabled={props.disabled}
        active={props.active}
      >
        <PaginationLink
          id={props.id}
          onClick={props.onClick}
        >
          {props.title}
        </PaginationLink>
      </PaginationItem>
    )
  }

  isDisabledPrevious = () => {
    return this.props.currentPage <= 1
  }

  isDisabledNext = () => {
    return this.props.currentPage === this.props.paginationNumbers.length
  }

  renderPaginationButton = () => {
    return this.props.paginationNumbers.map((item, index) => {
      const paginationNumberButton = {
        key: index,
        active: this.props.currentPage === item,
        id: item,
        title: item,
        onClick: this.props.onMovePage
      }

      return this.renderActionButton(paginationNumberButton)
    })
  }
}

PaginationButton.propTypes = {
  currentPage: PropTypes.number,
  paginationNumbers: PropTypes.array,
  onPreviousPage: PropTypes.func,
  onNextPage: PropTypes.func,
  onMovePage: PropTypes.func
}

export default PaginationButton
