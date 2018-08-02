import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MaterialIcon, H2, colors } from '../..'

const themes = {
	default: {
		bg: colors.primary,
		fg: colors.white,
		border: colors.primary,
		container_bg: colors.lightest_grey,
		container_bg_hover: colors.grey,
		container_fg: colors.black,
	},
	primary: {
		bg: colors.primary,
		fg: colors.white,
		border: colors.primary,
		container_bg: colors.primary,
		container_bg_hover: colors.primary__dark,
		container_fg: colors.white,
	},
	secondary: {
		bg: colors.secondary,
		fg: colors.black,
		border: colors.secondary,
		container_bg: colors.secondary,
		container_bg_hover: colors.secondary__dark,
		container_fg: colors.white,
	},
	tertiary: {
		bg: colors.tertiary,
		fg: colors.black,
		border: colors.tertiary,
		container_bg: colors.tertiary,
		container_bg_hover: colors.tertiary__dark,
		container_fg: colors.white,
	},
}

const reverseTheme = ({ bg, fg, ...rest }) => ({
	bg: fg,
	fg: bg,
	...rest,
})

const Container = styled.div`
	background: ${props => props.theme.bg};
	display: flex;
	justify-content: center;
	align-items: center;
	height: 56px;
	border-radius: 4px;
	padding: 8px;
`

const DropdownIcon = styled(MaterialIcon).attrs({
	children: 'check',
})`
	color: ${props => props.theme.fg};
`

const ButtonLabel = styled(H2)`
	color: ${props => props.theme.fg};
`

export default class QuickSwitch extends Component {
	state = {
		//
	}

	static propTypes = {
		//
	}

	render() {
		const { label, options } = this.props
		return (
			<Container>
				<ButtonLabel>{label.toUpperCase()}</ButtonLabel>
				<DropdownIcon />
			</Container>
		)
	}
}
