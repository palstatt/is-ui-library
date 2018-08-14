import React, { Component } from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'
import styled from 'styled-components'
import './create-theme'
import { SingleDatePicker } from 'react-dates'
import { MaterialIcon } from '../material-icon'
import { colors } from '../..'

export default class DateRange extends Component {
	state = {
		focused: true,
	}

	static propTypes = {
		value: momentPropTypes.momentObj,
		handleValueChange: PropTypes.func.isRequired,
	}

	static defaultProps = {
		value: null,
		handleValueChange: () => {},
	}

	handleDateSelect = date => {
		this.props.handleChangeValue(date)
	}

	render() {
		const { focused } = this.state
		const { value, handleChangeValue } = this.props
		return (
			<SingleDatePicker
				date={value}
				onDateChange={date => this.handleDateSelect(date)}
				focused={focused}
				onFocusChange={({ focused }) => this.setState({ focused })}
				id="single_date"
				small
				noBorder
			/>
		)
	}
}
