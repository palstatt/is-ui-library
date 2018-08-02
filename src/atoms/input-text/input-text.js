import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { H4, colors } from '../../'

//styling for label
const Label = styled(H4)`
	color: ${props => props.theme.label};
	margin: 0 ${props => (props.labelLeft ? '8px 0' : '0 8px')} 0;
`

//styling for input text, using theme.bg for border color
const InputTextField = styled.input.attrs({
	type: 'text',
})`
	background: ${colors.white};
	border: solid 2px ${props => props.theme.border || colors.black};
	width: 100%;
	box-sizing: border-box;
	margin: 0 0;
	border-radius: 2px;
	height: 48px;
	padding: 12px;
	font-size: 1em;
	outline: none;

	&::placeholder {
		color: ${colors.grey};
	}
`

//input text component with required [label, placeholder, active] props
const InputText = ({ value, onValueChange, label, active, ...props }) => {
	return (
		<Fragment>
			<Label>{label}</Label>
			<InputTextField
				value={value}
				onChange={e => onValueChange(e.target.value)}
				disabled={!active}
				{...props}
			/>
		</Fragment>
	)
}
InputText.propTypes = {
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
}
InputText.defaultProps = {
	label: 'Label',
	active: true,
	placeholder: 'Input',
}

export default InputText
