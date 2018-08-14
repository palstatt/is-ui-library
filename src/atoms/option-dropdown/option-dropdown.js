import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { MaterialIcon, Flip, H4, Accent, shadows, colors } from '../..'

const transition = {
	default: { type: 'tween', duration: 150, ease: 'easeIn' },
}

const themes = {
	default: {
		bg: colors.primary,
		fg: colors.white,
		border: colors.primary,
		container_bg: colors.lightest_grey,
		container_bg_hover: colors.primary__dark,
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

const Wrapper = styled.div`
	position: relative;
`

const Container = styled.div`
	background: ${props =>
		props.hover && !props.open
			? props.theme.container_bg_hover
			: props.theme.bg};
	color: ${props => props.theme.fg || colors.white};
	border: 2px solid
		${props =>
			props.open ? props.theme.border : 'transparent' || 'transparent'};
	height: 32px;
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2px 0 6px;
	border-radius: 4px;
	cursor: pointer;
	transition: 0.15s ease;

	$ > * {
		transition: 0.15s ease;
	}
`

const FilterLabel = styled(H4)`
	color: ${props => props.theme.fg};
	margin-right: 4px;
	line-height: normal;
`

const DropdownIcon = styled(MaterialIcon).attrs({
	children: 'arrow_drop_down',
})`
	color: ${props => props.theme.fg};
`

const optionsCollectionProps = {
	enter: { opacity: 1, y: '0px', transition, staggerChildren: 75, delay: 50 },
	exit: { opacity: 0, y: '-8px', transition },
}
const OptionsCollection = styled(posed.div(optionsCollectionProps))`
	background: ${props => props.theme.container_bg || colors.primary};
	color: ${props => props.theme.bg || colors.white};
	display: inline-block;
	border-radius: 4px;
	position: absolute;
	padding: 8px 0;
	top: 48px;
	left: 0;
	z-index: 10;
	box-shadow: ${shadows.focus};
	width: auto;

	::after {
		content: '';
		display: block;
		position: absolute;
		border-left: 16px solid transparent;
		border-right: 16px solid transparent;
		border-bottom: 16px solid
			${props => props.theme.container_bg || colors.primary};
		top: -8px;
		left: 8px;
		z-index: -1;
	}
`

const optionProps = {
	enter: { opacity: 1, transition },
	exit: { opacity: 0, transition },
}
const Option = styled(posed.div(optionProps))`
	display: flex;
	position: relative;
	justify-content: flex-start;
	align-content: center;
	padding: 8px 16px;
	cursor: pointer;
	transition: 0.2s ease;

	:hover {
		background: ${props => props.theme.container_bg_hover};
		transition: 0.15s ease;
	}
`

const OptionText = styled(H4)`
	color: ${props => props.theme.container_fg};
	line-height: normal;
	white-space: nowrap;
`

export default class OptionDropdown extends Component {
	state = {
		open: false,
		hover: false,
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		theme: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
		options: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.any.isRequired,
				label: PropTypes.string.isRequired,
			})
		),
	}

	static defaultProps = {
		theme: 'primary',
		options: [],
	}

	handleClickContainer = () => {
		this.setState(({ open }) => ({ open: !open }))
	}

	handleClickOutside = e => {
		if (!this.wrapperRef.contains(e.target)) {
			this.setState({ open: false })
		}
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside)
	}

	render() {
		const { open, hover } = this.state
		const { selectionId, theme, label, options, changeFilter } = this.props
		const activeFilter = options.find(option => option.id === selectionId)
		return (
			<Wrapper>
				<ThemeProvider
					theme={open ? reverseTheme(themes[theme]) : themes[theme]}>
					<Fragment>
						<Container
							open={open}
							hover={hover}
							innerRef={wrapperRef => (this.wrapperRef = wrapperRef)}
							onMouseEnter={() => {
								this.setState({ hover: true })
							}}
							onMouseLeave={() => {
								this.setState({ hover: false })
							}}
							onClick={this.handleClickContainer}>
							<FilterLabel>
								{activeFilter
									? activeFilter.label.toUpperCase()
									: label.toUpperCase()}
							</FilterLabel>
							<Flip in={open} component={<DropdownIcon />} />
						</Container>
						<PoseGroup>
							{open && (
								<OptionsCollection key="__container__">
									{options.map(option => (
										<Fragment key={option.id}>
											{option.id !== selectionId && (
												<Option
													onMouseDown={() => {
														changeFilter(option)
														this.setState({ open: false })
													}}>
													<OptionText>{option.label.toUpperCase()}</OptionText>
												</Option>
											)}
										</Fragment>
									))}
								</OptionsCollection>
							)}
						</PoseGroup>
					</Fragment>
				</ThemeProvider>
			</Wrapper>
		)
	}
}
