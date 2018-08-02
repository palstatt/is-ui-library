import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MaterialIcon, Appear, colors } from '../../'

/**
 * styling for option container, becoming grey when hovered and darker grey when
 * selected and hovered
 **/
const OptionContainer = styled.div`
	background: ${props => (props.disabled ? colors.light_grey : 'transparent')};
	cursor: ${props => (props.disabled ? 'default' : 'pointer')};
	display: flex;
	justify-content: space-between;
	width: auto;
	height: 56px;
	padding: 16px;
	transition: 0.15s ease-in-out;
	overflow: hidden;

	&:hover {
		background: ${props =>
			props.disabled
				? colors.light_grey
				: props.selected
					? colors.light_grey
					: colors.lightest_grey};
	}
`

// styling for option title container
const OptionTitleContainer = styled.div`
	display: flex;
	position: relative;
	min-width: 0;
	justify-content: space-between;
	align-items: center;
	user-select: none;
`

// styling for option title
const OptionTitle = styled.p`
	color: ${props => (props.disabled ? colors.lightest_grey : 'inherit')};
	margin: 0 8px 0 0;
	font-size: 1em;
	user-select: none;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`

// option component with required [title] prop
export default class DropdownOption extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}

	handleClick = e => {
		e.preventDefault()
		this.props.onToggle()
	}

	render() {
		const { title, selected, disabled } = this.props
		return (
			<Fragment>
				<OptionContainer
					onClick={this.handleClick}
					selected={selected}
					disabled={disabled}>
					<OptionTitleContainer>
						<OptionTitle>{title}</OptionTitle>
					</OptionTitleContainer>
					<Appear
						in={selected}
						component={<MaterialIcon color={colors.black}>check</MaterialIcon>}
					/>
				</OptionContainer>
			</Fragment>
		)
	}
}
