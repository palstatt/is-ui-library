import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { Dropdown, ValidationText, colors, themes } from '../..'

const Container = styled.div`
	width: ${props => (props.width ? `${props.width}px` : 'auto')};
`

export default class DropdownWithValidation extends Component {
	static propTypes = {
		//
	}

	getTheme = () => {
		const { valid, pristine } = this.props
		switch (true) {
			case pristine:
				return themes.active
			case valid:
				return themes.complete
			case !valid:
				return themes.warning
			default:
				return themes.active
		}
	}

	render() {
		const theme = this.getTheme()
		const {
			value,
			valid,
			onValueChange,
			label,
			prompt,
			errorMessage,
			width,
			pristine,
			options,
			dynamicLabel,
			nullOption,
			noNullSelect,
		} = this.props
		return (
			<ThemeProvider theme={theme}>
				<Container>
					<Dropdown
						value={value}
						label={label}
						options={options}
						dynamicLabel={dynamicLabel}
						nullOption={nullOption}
						noNullSelect={noNullSelect}
						onValueChange={onValueChange}
					/>
					<ValidationText
						validationText={pristine ? prompt : valid ? '' : errorMessage}
						isOpen={!valid}
					/>
				</Container>
			</ThemeProvider>
		)
	}
}
