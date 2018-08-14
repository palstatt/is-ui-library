import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'
import DateRange from './date-range'
import SingleDay from './single-day'

const dateTypes = {
	RANGE: 'RANGE',
	TODAY_TO: 'TODAY_TO',
	SINGLE_DAY: 'SINGLE_DAY',
}

const DATE_PICKERS = props => ({
	RANGE: <DateRange {...props} />,
	TODAY_TO: <SingleDay {...props} />,
	SINGLE_DAY: <SingleDay {...props} />,
})

export class DatePicker extends Component {
	state = {}

	static dateTypes = dateTypes

	static propTypes = {
		value: PropTypes.oneOfType([
			PropTypes.shape({
				startDate: momentPropTypes.momentObj,
				endDate: momentPropTypes.momentObj,
			}),
			momentPropTypes.momentObj,
		]).isRequired,
		handleValueChange: PropTypes.func.isRequired,
		dateType: PropTypes.oneOf(Object.entries(dateTypes).map(type => type[1])),
	}

	static defaultProps = {
		value: null,
		handleValueChange: () => {},
		dateType: dateTypes.RANGE,
	}

	render() {
		const { dateType, ...props } = this.props
		return <Fragment>{DATE_PICKERS(this.props)[dateType]}</Fragment>
	}
}
