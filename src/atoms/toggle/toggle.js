import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { H4, Accent, colors } from '../../'

// themes for toggle [hoverFalse, hoverTrue, defaultFalse, defaultTrue, disabledFalse, disabledTrue]
const themes = {
	hoverFalse: {
		bg: colors.white,
		border: colors.black,
		track: colors.grey,
		label: colors.black,
		false_label: colors.black,
		true_label: colors.grey,
	},
	hoverTrue: {
		bg: colors.white,
		border: colors.primary,
		track: colors.primary,
		label: colors.black,
		false_label: colors.grey,
		true_label: colors.primary,
	},
	defaultFalse: {
		bg: colors.black,
		border: colors.black,
		track: colors.grey,
		label: colors.black,
		false_label: colors.grey,
		true_label: colors.grey,
	},
	defaultTrue: {
		bg: colors.primary,
		border: colors.primary,
		track: colors.primary,
		label: colors.black,
		false_label: colors.grey,
		true_label: colors.grey,
	},
	disabledFalse: {
		bg: colors.grey,
		border: colors.grey,
		track: colors.lightest_grey,
		label: colors.grey,
		false_label: colors.grey,
		true_label: colors.grey,
	},
	disabledTrue: {
		bg: colors.grey,
		border: colors.grey,
		track: colors.lightest_grey,
		label: colors.grey,
		false_label: colors.grey,
		true_label: colors.grey,
	},
}

// styling for container, disabling pointer events when disabled
const Container = styled.div`
	display: inline-block;
	pointer-events: ${props => (props.disabled ? 'none' : 'auto' || 'auto')};
	user-select: none;
`

// styling for hidden toggle ref, a checkbox input that can be accessed on a form
const ToggleRef = styled.input.attrs({
	type: 'checkbox',
})`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	border: 0;
	visibility: visible;
	white-space: nowrap;
`

// styling for toggle label, using theme.label for color
const ToggleLabel = H4.extend`
	color: ${props => props.theme.label};
	margin-bottom: 8px;
	transition: all 0.1s ease;
`

// styling for content container, setting up transition time for all children
const ContentContainer = styled.label`
	display: flex;
	position: relative;
	align-items: center;
	cursor: pointer;

	& *,
	*:after,
	*:before {
		transition: all 0.1s ease;
	}
`

/**
 * styling for toggle button, changing position on state, modulating width when clicked,
 * using theme.track for track background, theme.bg for button background, theme.border
 * for button border
 **/
const ToggleButton = styled.span`
	position: relative;
	width: 32px;

	&::before {
		position: absolute;
		display: block;
		background: ${props => props.theme.track};
		content: '';
		width: 100%;
		top: -2px;
		border-radius: 2px;
		height: 4px;
		cursor: pointer;
	}

	&::after {
		position: absolute;
		display: block;
		top: -8px;
		left: ${props =>
			(props.on ? 16 : 0) + (props.on && props.clicked ? -8 : 0)}px;
		content: '';
		cursor: pointer;
		background: ${props => props.theme.bg};
		border: 2px solid ${props => props.theme.border};
		width: ${props => (props.clicked ? 24 : 16)}px;
		height: 16px;
		border-radius: 16px;
	}
`

// styling for toggle label false, using theme.false_label for color
const ToggleLabelFalse = styled(Accent)`
	color: ${props => props.theme.false_label};
	margin-right: 8px;
`

// styling for toggle label true, using theme.true_lable for color
const ToggleLabelTrue = styled(Accent)`
	color: ${props => props.theme.true_label};
	margin-left: 8px;
`

// toggle component with required [label, labelFalse, labelTrue] props
export default class Toggle extends Component {
	state = {
		hover: false,
		disabled: false,
		clicked: false,
	}

	static propTypes = {
		value: PropTypes.bool.isRequired,
		onValueChange: PropTypes.func.isRequired,
		label: PropTypes.string.isRequired,
		labelFalse: PropTypes.string.isRequired,
		labelTrue: PropTypes.string.isRequired,
	}

	static defaultProps = {
		onValueChange: () => {},
		label: 'Label',
		labelFalse: 'False',
		labelTrue: 'True',
	}

	onToggle = () => {
		this.props.onValueChange()
	}
	getTheme = () => {
		const { disabled, hover } = this.state
		const on = this.props.value
		switch (true) {
			case disabled && !on:
				return themes.disabledFalse
			case disabled && on:
				return themes.disabledTrue
			case !disabled && !on && !hover:
				return themes.defaultFalse
			case !disabled && on && !hover:
				return themes.defaultTrue
			case !disabled && !on && hover:
				return themes.hoverFalse
			case !disabled && on && hover:
				return themes.hoverTrue
			default:
				return themes.disabledFalse
		}
	}

	render() {
		const { clicked, disabled } = this.state
		const { value, label, labelFalse, labelTrue, input } = this.props
		const theme = this.getTheme()
		return (
			<ThemeProvider theme={theme}>
				<Container
					disabled={disabled}
					onMouseEnter={() => this.setState({ hover: true })}
					onMouseLeave={() => this.setState({ hover: false, clicked: false })}>
					<ToggleRef checked={value} onChange={() => {}} {...input} />
					<ToggleLabel>{label}</ToggleLabel>
					<ContentContainer
						onClick={this.onToggle}
						onMouseDown={() => this.setState({ clicked: true })}
						onMouseUp={() => this.setState({ clicked: false })}>
						<ToggleLabelFalse>{labelFalse}</ToggleLabelFalse>
						<ToggleButton on={value} clicked={clicked} />
						<ToggleLabelTrue>{labelTrue}</ToggleLabelTrue>
					</ContentContainer>
				</Container>
			</ThemeProvider>
		)
	}
}
