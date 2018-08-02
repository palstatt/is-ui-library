import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, keyframes } from 'styled-components'
import { P, MaterialIcon, Appear, Rotate, Grow, colors } from '../../'

// themes for tags [primary, secondary, tertiary, black, white, warning]
const themes = {
	primary: {
		bg: colors.primary,
		fg: colors.white,
		bg_hover: colors.primary_hover,
	},
	secondary: {
		bg: colors.secondary,
		fg: colors.white,
		bg_hover: colors.secondary_hover,
	},
	tertiary: {
		bg: colors.tertiary,
		fg: colors.white,
		bg_hover: colors.tertiary_hover,
	},
	black: {
		bg: colors.black,
		fg: colors.white,
		border: false,
	},
	white: {
		bg: colors.white,
		fg: colors.black,
		border: true,
	},
	warning: {
		bg: colors.white,
		fg: colors.warning,
		border: true,
	},
}

// styling for close button
const CloseButton = MaterialIcon.extend`
	cursor: pointer;
`

// styling for title
const Title = P.extend`
	color: ${props => props.theme.fg};
	margin-left: 8px;
	margin-right: 8px;
`

// styling for add button input, autofocusing and maxlength of 10
const TitleInput = styled.input.attrs({
	type: 'text',
	autoFocus: 'true',
	maxLength: 10,
})`
	color: ${props => props.theme.fg};
	outline: none;
	padding: 0 8px 0;
	background: transparent;
	border: none;
	min-width: 0;
	max-width: 7em;
	font-size: 1em;
	text-align: left;
	transform-origin: right center;
`

// styling for tag container, using theme.bg / theme.bg_hover for background and theme.fg for color
const TagContainer = styled.div`
	display: inline-flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	padding: 4px;
	height: 32px;
	background: ${props => props.theme.bg};
	color: ${props => props.theme.fg};
	border-radius: 8px;
	user-select: none;
	transition: 0.075s ease;

	&:hover {
		background: ${props => props.theme.bg_hover};
	}
`

// styling for add tag container, animating error shake when error, using theme.bg for background, using theme.fg for border and color
const AddTagContainer = styled.div`
	display: inline-flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	padding: 4px;
	height: 32px;
	background: ${props => props.theme.bg};
	color: ${props => props.theme.fg};
	border-radius: 8px;
	user-select: none;
	cursor: pointer;
	transition: 0.075s ease;
	border: 2px solid
		${props => (props.theme.border ? props.theme.fg : props.theme.bg)};
	transition: 0.2s ease;
	animation: ${props => (props.error ? `${errorShake} .25s linear 2` : '')};

	* {
		transition: 0.2s ease;
	}
`

// animation for error shake
const errorShake = keyframes`
0%, 100% {
  transform: translateX(0);
}
25% {
  transform: translateX(8px);
}
50% {
  transform: translateX(0);
}
75% {
  transform: translateX(8px);
}
`
const errorShakeLength = 600

// styling for add button, rotating when active to look like close button
const AddButton = styled(MaterialIcon)`
	transform: rotate(${props => (props.active ? 45 : 0)}deg);
	transform-origin: center center;
	transition: 0.1s ease-in 0.1s;
`

// add tag component
export class AddTag extends Component {
	state = {
		hover: false,
		click: false,
		value: '',
		error: false,
	}

	//default tag data, defaulting theme the primary
	tagFactory = name => {
		return {
			key: name,
			name: name,
			theme: 'primary',
		}
	}

	handleMouseEnter = () => {
		this.setState({ hover: true })
	}

	handleMouseLeave = () => {
		this.setState({ hover: false })
	}

	handleClick = () => {
		this.setState(prevState => ({ click: !prevState.click }))
	}

	//error shake
	handleKeyPress = e => {
		if (e.charCode === 13) {
			const error = this.props.add(this.tagFactory(this.state.value))
			this.setState(
				{
					value: '',
					click: false,
					error: error,
				},
				() => {
					setTimeout(() => this.setState({ error: false }), errorShakeLength)
				}
			)
		}
	}

	handleChange = e => {
		this.setState({ value: e.target.value })
	}

	render() {
		const { hover, click, value, error } = this.state
		const active = hover || click || error
		return (
			<ThemeProvider
				theme={
					themes[active && !error ? 'white' : error ? 'warning' : 'black']
				}>
				<AddTagContainer
					error={error}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}>
					<Appear
						in={active}
						component={
							<MaterialIcon onClick={this.handleClick}>
								local_offer
							</MaterialIcon>
						}
					/>
					<Grow
						in={click}
						component={
							<TitleInput
								onChange={this.handleChange}
								onKeyPress={this.handleKeyPress}
								value={value}
							/>
						}
					/>
					<Rotate
						in={active}
						component={
							<AddButton onClick={this.handleClick} active={click}>
								add
							</AddButton>
						}
					/>
				</AddTagContainer>
			</ThemeProvider>
		)
	}
}

// tag component with required [title, theme] props
export default class Tag extends Component {
	state = {
		hover: false,
	}

	static propTypes = {
		title: PropTypes.string.isRequired,
		theme: PropTypes.oneOf(['primary', 'secondary', 'tertiary']).isRequired,
	}

	static defaultProps = {
		title: 'Title',
		theme: 'primary',
	}

	handleMouseEnter = () => {
		this.setState({ hover: true })
	}

	handleMouseLeave = () => {
		this.setState({ hover: false })
	}

	render() {
		const { hover } = this.state
		const { theme, title } = this.props
		return (
			<ThemeProvider theme={themes[theme]}>
				<TagContainer
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}>
					<MaterialIcon>local_offer</MaterialIcon>
					<Title>{title}</Title>
					<Appear
						in={hover}
						component={
							<CloseButton onClick={this.props.onClick}>close</CloseButton>
						}
					/>
				</TagContainer>
			</ThemeProvider>
		)
	}
}
