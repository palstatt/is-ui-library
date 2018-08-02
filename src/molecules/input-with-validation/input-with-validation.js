import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import {
	ValidationText,
	InputText,
	InputTextArea,
	colors,
	themes,
} from '../../'

// styling for input container
const InputContainer = styled.div`
	width: ${props => (props.width ? `${props.width}px` : 'auto')};

	& * {
		transition: 0.2s ease;
	}
`

/**
 * input with validation component with required [label, placeholder, validationText] props
 * and optional [width] prop which if present will make component inline
 **/
export default class InputWithValidation extends Component {
	state = {
		valid: false,
		invalid: false,
		disabled: false,
		focused: false,
		validating: false,
		hover: false,
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		prompt: PropTypes.string.isRequired,
		errorMessage: PropTypes.string.isRequired,
		width: PropTypes.number,
		rows: PropTypes.number,
		maxRows: PropTypes.number,
	}

	static defaultProps = {
		placeholder: 'Input',
		label: 'Label',
		prompt: 'Valid input',
		errorMessage: 'Invalid input',
	}

	getTheme = () => {
		const { valid, pristine } = this.props
		const { invalid, disabled, focused, validating } = this.state
		switch (true) {
			case focused:
				return themes.focused
			case pristine:
				return themes.active
			case disabled:
				return themes.disabled
			case valid:
				return themes.complete
			case !valid:
				return themes.warning
			case validating:
				return themes.validating
			default:
				return themes.active
		}
	}

	handleChange = e => {
		this.props.onValueChange
	}

	handleFocus = () => {
		this.setState({ focused: true })
	}

	handleBlur = () => {
		this.setState({ focused: false })
	}

	render() {
		const theme = this.getTheme()
		const {
			value,
			valid,
			onValueChange,
			label,
			placeholder,
			prompt,
			errorMessage,
			width,
			multiline,
			pristine,
			rows,
			maxRows,
		} = this.props
		const { disabled, focused, hover } = this.state
		return (
			<ThemeProvider theme={theme}>
				<InputContainer width={width}>
					{multiline ? (
						<InputTextArea
							value={value}
							onValueChange={onValueChange}
							label={label}
							placeholder={placeholder}
							rows={rows}
							maxRows={maxRows}
							active={!disabled}
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
						/>
					) : (
						<InputText
							value={value}
							onValueChange={onValueChange}
							label={label}
							placeholder={placeholder}
							active={!disabled}
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
						/>
					)}
					<ValidationText
						validationText={
							focused || pristine ? prompt : valid ? '' : errorMessage
						}
						isOpen={!valid || focused}
						onMouseEnter={() => this.setState({ hover: true })}
						onMouseLeave={() => this.setState({ hover: false })}
					/>
				</InputContainer>
			</ThemeProvider>
		)
	}
}
