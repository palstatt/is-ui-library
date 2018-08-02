import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextareaAutosize from 'react-autosize-textarea'
import { H4, Label, colors } from '../../'

//styling for input text, using theme.bg for border color
const StyledTextarea = styled(TextareaAutosize).attrs({
	rows: props => props.rows,
	maxRows: props => props.maxRows,
})`
	border: solid 2px ${props => props.theme.border || colors.black};
	background: ${colors.white};
	font: inherit;
	width: 100%;
	margin: 0 0;
	box-sizing: border-box;
	border-radius: 2px;
	padding: 12px;
	font-size: 1em;
	resize: none;
	outline: none;

	&::placeholder {
		color: ${colors.grey};
	}
`

const Container = styled.div`
	display: flex;
	flex-direction: ${props => (props.labelLeft ? 'row' : 'column')};
	margin: 8px 0;
	width: 100%;
`

//input text component with required [label, placeholder, active] props
const InputTextArea = ({
	label,
	labelLeft,
	active,
	value,
	rows,
	maxRows,
	onValueChange,
	...props
}) => {
	return (
		<Container labelLeft={labelLeft}>
			<Label labelLeft={labelLeft}>{label}</Label>
			<StyledTextarea
				rows={rows}
				maxRows={maxRows}
				value={value}
				disabled={!active}
				onChange={e => onValueChange(e.target.value)}
				{...props}
			/>
		</Container>
	)
}
InputTextArea.propTypes = {
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
}
InputTextArea.defaultProps = {
	label: 'label',
	active: true,
	placeholder: 'Input',
	rows: 2,
	maxRows: 4,
}

export default InputTextArea
