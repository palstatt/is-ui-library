import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { Appear, MaterialIcon, H4, Accent, colors } from '../..'

const themes = {
	complete: {
		bg: colors.complete__bg,
		fg: colors.black,
		hover_bg: colors.complete,
	},
	attention: {
		bg: colors.attention__bg,
		fg: colors.black,
		hover_bg: colors.attention,
	},
	warning: {
		bg: colors.warning__bg,
		fg: colors.black,
		hover_bg: colors.warning,
	},
}

const Container = styled.div`
	background: ${props => props.theme.bg};
	color: ${props => props.theme.fg};
	height: 32px;
	display: ${props => (props.inline ? 'inline-' : '')}flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 4px;
	padding: 0 8px;
	transition: 0.2s ease;

	:hover {
		background: ${props => props.theme.hover_bg};
	}
`

const Title = styled(H4)`
	line-height: normal;
`

const Description = styled(Accent)`
	margin-left: 16px;
	overflow: hidden;
`

const RemoveIcon = styled(MaterialIcon).attrs({
	children: 'close',
})`
	color: ${colors.black};
	cursor: pointer;
	z-index: 0;
	margin-left: 8px;
`

export default class Pill extends Component {
	state = {
		hover: false,
	}

	static propTypes = {
		id: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		theme: PropTypes.oneOf(['complete', 'attention', 'warning']).isRequired,
		description: PropTypes.string,
		inline: PropTypes.bool,
		removeable: PropTypes.bool,
	}

	static defaultProps = {
		value: 'Loading...',
		theme: 'complete',
	}

	render() {
		const { hover } = this.state
		const {
			id,
			value,
			theme,
			description,
			inline,
			removeable,
			onRemove,
			onClick,
		} = this.props
		return (
			<ThemeProvider theme={themes[theme]}>
				<Container
					inline={inline}
					onMouseEnter={() => this.setState({ hover: true })}
					onMouseLeave={() => this.setState({ hover: false })}>
					<Title>{value.toUpperCase()}</Title>
					{description && <Description>{description}</Description>}
					{removeable && (
						<Appear
							in={hover}
							component={<RemoveIcon onClick={() => onRemove(id)} />}
						/>
					)}
				</Container>
			</ThemeProvider>
		)
	}
}
