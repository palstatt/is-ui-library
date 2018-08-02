import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { MaterialIcon, colors, shadows, H2 } from '../../'

// button themes [default, secondary, clicked, disabled]
const themes = (primaryColor, dark = false) => ({
	default: {
		bg: colors[primaryColor],
		fg: dark ? colors.black : colors.white,
		border: colors[primaryColor],
		shadow: shadows.basic,
	},
	secondary: {
		bg: dark ? colors.black : colors.white,
		fg: colors[primaryColor],
		border: colors[primaryColor],
		shadow: shadows.basic,
	},
	clicked: {
		bg: colors.grey,
		fg: colors[primaryColor],
		border: colors[primaryColor],
		shadow: 'none',
	},
	disabled: {
		bg: colors.grey,
		fg: colors.lightest_grey,
		border: colors.grey,
		shadow: 'none',
	},
})

// styling for button container, wider when large prop passed
const ButtonContainer = styled.button`
	background: ${props => props.theme.bg};
	color: ${props => props.theme.fg};
	box-shadow: ${props => (props.shadow ? props.theme.shadow : '')};
	border: 2px solid ${props => props.theme.border};
	pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
	display: flex;
	padding: 6px;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	outline: none;
	cursor: pointer;
	transition: 0.1s ease;
	max-height: 48px;

	&:focus {
		outline: none;
	}

	& * {
		transition: 0.1s ease;
	}
`

// styling for button label
const ButtonLabel = styled(H2)``

// button component with required [label] prop and optional [disabled, large] props
export default class Button extends Component {
	state = {
		hover: false,
		clicked: false,
		disabled: this.props.disabled,
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		noLabel: PropTypes.bool,
		disabled: PropTypes.bool,
		icon: PropTypes.string,
		large: PropTypes.bool,
		secondary: PropTypes.bool,
		mobile: PropTypes.bool,
		primaryColorName: PropTypes.string,
		dark: PropTypes.bool,
	}

	static defaultProps = {
		label: 'primary',
		icon: 'check',
		primaryColorName: 'primary',
	}

	getTheme = (secondary = false, mobile = false, primaryColorName) => {
		const { hover, disabled, clicked } = this.state
		const { dark } = this.props
		const currentTheme = themes(primaryColorName, dark)

		if (mobile) {
			switch (true) {
				case secondary:
					return currentTheme.secondary
				case clicked:
					return currentTheme.clicked
				default:
					return currentTheme.default
			}
		} else {
			switch (true) {
				case disabled:
					return currentTheme.disabled
				case !disabled && !hover && !clicked && !secondary:
					return currentTheme.default
				case !disabled && hover && !clicked && !secondary:
					return currentTheme.secondary
				case !disabled && hover && clicked:
					return currentTheme.clicked
				case !disabled && !hover && !clicked && secondary:
					return currentTheme.secondary
				case !disabled && hover && !clicked && secondary:
					return currentTheme.default
				default:
					return currentTheme.default
			}
		}
	}

	render() {
		const {
			label,
			noLabel,
			icon,
			secondary,
			mobile,
			primaryColorName,
			...props
		} = this.props
		const theme = this.getTheme(secondary, mobile, primaryColorName)
		return (
			<ThemeProvider theme={theme}>
				<ButtonContainer
					onMouseEnter={() => this.setState({ hover: true })}
					onMouseLeave={() => this.setState({ hover: false, clicked: false })}
					onFocus={() => this.setState({ hover: true })}
					onBlur={() => this.setState({ hover: false, clicked: false })}
					onMouseDown={() => this.setState({ clicked: true })}
					onMouseUp={() => this.setState({ clicked: false })}
					onTouchStart={() => this.setState({ clicked: true })}
					onTouchCancel={() => this.setState({ clicked: false })}
					{...props}>
					<MaterialIcon large>{icon}</MaterialIcon>
					{!noLabel && <ButtonLabel>{label.toUpperCase()}</ButtonLabel>}
				</ButtonContainer>
			</ThemeProvider>
		)
	}
}
