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

const IconContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const ArrowIcon = styled(MaterialIcon).attrs({
	children: 'arrow_right_alt',
	color: colors.black,
})``

const CloseIcon = styled(MaterialIcon).attrs({
	children: 'close',
	color: colors.primary,
})``

export default class DateRange extends Component {
	state = {
		focusedInput: START_DATE,
	}

	static propTypes = {
		value: PropTypes.shape({
			startDate: momentPropTypes.momentObj,
			endDate: momentPropTypes.momentObj,
		}).isRequired,
		handleValueChange: PropTypes.func.isRequired,
	}

	static defaultProps = {
		value: {
			startDate: null,
			endDate: null,
		},
		handleValueChange: () => {},
	}

	handleDateSelect = (startDate, endDate) => {
		this.props.handleValueChange({ startDate, endDate })
	}

	render() {
		const { focusedInput } = this.state
		const { value } = this.props
		return (
			<DateRangePicker
				startDate={value.startDate}
				startDateId="start_date"
				endDate={value.endDate}
				endDateId="end_date"
				onDatesChange={({ startDate, endDate }) =>
					this.handleDateSelect(startDate, endDate)
				}
				focusedInput={focusedInput}
				onFocusChange={focusedInput => this.setState({ focusedInput })}
				customArrowIcon={
					<IconContainer>
						<ArrowIcon />
					</IconContainer>
				}
				customCloseIcon={
					<IconContainer>
						<CloseIcon />
					</IconContainer>
				}
				noBorder
				showClearDates
				startDatePlaceholderText="START DATE"
				endDatePlaceholderText="END DATE"
			/>
		)
	}
}
