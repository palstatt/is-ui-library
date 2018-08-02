import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../..'

const ButtonContainer = styled.button`
	color: ${props =>
		props.disabled ? colors.light_grey : props.color || colors.primary};
	margin: ${props => props.margin || ''};
	cursor: ${props => (props.disabled ? '' : 'pointer')};
	background: none;
	border: none;
	outline: inherit;
	text-align: center;
	font-size: ${props => (props.small ? 0.8 : 1.1875)}rem;
	font-weight: bold;
	line-height: normal;
	padding: 0;
	transition: 0.15s ease;
`

export default class FlatButton extends Component {
	static propTypes = {
		label: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['button', 'submit']),
		small: PropTypes.bool,
		onClick: PropTypes.func.isRequired,
	}

	static defaultProps = {
		type: 'button',
		onClick: () => {},
	}

	handleClick = e => {
		if (e.type === 'click') {
			this.props.onClick()
		} else if (e.type === 'contextmenu') {
			this.props.onRightClick()
		} else {
			this.props.onClick()
		}
	}

	render() {
		const { label, disabled, small, ...props } = this.props
		return (
			<ButtonContainer
				disabled={disabled}
				small={small}
				onClick={this.handleClick}
				{...props}>
				{label.toUpperCase()}
			</ButtonContainer>
		)
	}
}
