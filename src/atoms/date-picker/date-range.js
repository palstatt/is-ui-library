import React, { Component } from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'
import styled from 'styled-components'
import './create-theme'
import { DateRangePicker } from 'react-dates'
import {
  START_DATE,
  END_DATE,
  ICON_AFTER_POSITION,
} from 'react-dates/constants'
import { MaterialIcon } from '../material-icon'
import { colors } from '../..'

export default class DateRange extends Component {
  state = {
    focusedInput: START_DATE,
  }

  static propTypes = {
    value: PropTypes.shape({
      startDate: momentPropTypes.momentObj,
      endDate: momentPropTypes.momentObj,
    }),
    handleChangeValue: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: {
      startDate: null,
      endDate: null,
    },
    handleChangeValue: () => {},
  }

  handleDateSelect = (startDate, endDate) => {
    this.props.handleChangeValue({ startDate, endDate })
  }

  render() {
    const { focusedInput } = this.state
    const { value } = this.props
    return (
      <DateRangePicker
        startDate={value.startDate ? value.startDate : null}
        startDateId="start_date"
        endDate={value.endDate ? value.endDate : null}
        endDateId="end_date"
        onDatesChange={({ startDate, endDate }) =>
          this.handleDateSelect(startDate, endDate)
        }
        focusedInput={focusedInput}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
        noBorder
        small
      />
    )
  }
}
