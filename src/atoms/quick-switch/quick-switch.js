import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import {
	MaterialIcon,
	H2,
	H3,
	Accent,
	Flip,
	Appear,
	colors,
	shadows,
} from '../..'

const transition = {
	default: { type: 'tween', duration: 200, ease: 'easeIn' },
}

const themes = {
	default: {
		bg: colors.primary,
		fg: colors.white,
		border: colors.primary,
		container_bg: colors.lightest_grey,
		container_bg_hover: colors.primary__dark,
		container_bg_active: colors.primary__bg,
		container_fg: colors.black,
	},
	primary: {
		bg: colors.primary,
		fg: colors.white,
		border: colors.primary,
		container_bg: colors.primary,
		container_bg_hover: colors.primary__dark,
		container_bg_active: colors.primary__bg,
		container_fg: colors.white,
	},
	secondary: {
		bg: colors.secondary,
		fg: colors.black,
		border: colors.secondary,
		container_bg: colors.secondary,
		container_bg_hover: colors.secondary__dark,
		container_bg_active: colors.secondary__bg,
		container_fg: colors.black,
	},
	tertiary: {
		bg: colors.tertiary,
		fg: colors.black,
		border: colors.tertiary,
		container_bg: colors.tertiary,
		container_bg_hover: colors.tertiary__dark,
		container_bg_active: colors.tertiary__bg,
		container_fg: colors.black,
	},
	complete: {
		bg: colors.complete,
		fg: colors.black,
		border: colors.complete,
		container_bg: colors.complete,
		container_bg_hover: colors.complete__dark,
		container_bg_active: colors.complete__bg,
		container_fg: colors.black,
	},
	attention: {
		bg: colors.attention,
		fg: colors.black,
		border: colors.attention,
		container_bg: colors.attention,
		container_bg_hover: colors.attention__dark,
		container_bg_active: colors.attention__bg,
		container_fg: colors.black,
	},
	warning: {
		bg: colors.warning,
		fg: colors.black,
		border: colors.warning,
		container_bg: colors.warning,
		container_bg_hover: colors.warning__dark,
		container_bg_active: colors.warning__bg,
		container_fg: colors.black,
	},
}

const reverseTheme = ({
	bg,
	container_bg_active,
	fg,
	container_bg_hover,
	border,
	...rest
}) => ({
	bg: container_bg_active,
	fg: container_bg_hover,
	border: container_bg_hover,
	container_bg_active,
	container_bg_hover,
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
	border: 2px solid
		${props =>
			props.open ? props.theme.border : 'transparent' || 'transparent'};
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 56px;
	border-radius: 4px;
	padding: 8px;
	cursor: pointer;
	transition: 0.15s ease;

	$ > * {
		transition: 0.15s ease;
	}
`

const DropdownIcon = styled(MaterialIcon).attrs({
	children: 'arrow_drop_down',
})`
	color: ${props => props.theme.fg};
`

const CheckIcon = styled(MaterialIcon).attrs({
	children: 'check',
})`
	color: ${props => props.theme.container_fg};
`

const optionsCollectionProps = {
	enter: { opacity: 1, y: '0px', transition, staggerChildren: 25, delay: 125 },
	exit: { opacity: 0, y: '-8px', transition },
}
const OptionsCollection = styled(posed.div(optionsCollectionProps))`
	background: ${colors.lightest_grey};
	color: ${props => props.theme.bg || colors.white};
	display: inline-grid;
	grid-template-columns: ${props =>
		props.columns ? `${'1fr '.repeat(props.columns)}` : '1fr' || '1fr'};
	grid-template-rows: auto 1fr;
	grid-template-areas: ${props =>
		props.columns
			? `"${'prompt '.repeat(props.columns)}" "${'options '.repeat(
					props.columns
			  )}"`
			: `"prompt" "options"` || `"prompt" "options"`};
	border-radius: 4px;
	position: absolute;
	padding: 8px 0;
	top: 64px;
	${props =>
		props.align === 'center' ? 'left' : props.align || 'left'}: ${props =>
		props.align === 'center'
			? `calc(50% - ${props.columns * 140}px)`
			: '8px' || '8px'};
	z-index: 10;
	width: ${props => props.columns * 280 || 280}px;
	box-shadow: ${shadows.focus};

	::after {
		content: '';
		display: block;
		position: absolute;
		border-left: 16px solid transparent;
		border-right: 16px solid transparent;
		border-bottom: 16px solid ${colors.lightest_grey};
		top: -8px;
		${props =>
			props.align === 'center' ? 'left' : props.align || 'left'}: ${props =>
			props.align === 'center' ? 'calc(50% - 16px)' : '8px' || '8px'};
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
	width: 100%;
	padding: 8px;
	height: 48px;
	cursor: pointer;
	transition: 0.2s ease;

	:hover {
		background: ${colors.light_grey};
		transition: 0.15s ease;
	}
`

const Highlight = styled.div`
	background: ${props =>
		props.active ? props.highlightColor : 'none' || 'none'};
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 8px;
	width: 100%;
	padding: 8px;
`

const ButtonLabel = styled(H2)`
	color: ${props => props.theme.fg};
	margin-right: 8px;
	line-height: normal;
`

const OptionText = styled(H3)`
	color: ${props => props.theme.container_fg};
	line-height: normal;
`

const PromptText = styled(Accent)`
	grid-area: prompt;
	line-height: normal;
	margin: 8px;
`

export default class QuickSwitch extends Component {
	state = {
		open: false,
		hover: false,
		selection: null,
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		theme: PropTypes.oneOf([
			'default',
			'primary',
			'secondary',
			'tertiary',
			'complete',
			'attention',
			'warning',
		]),
		options: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				activeColor: PropTypes.string.isRequired,
			})
		).isRequired,
		onSelectOption: PropTypes.func.isRequired,
		prompt: PropTypes.string.isRequired,
		columns: PropTypes.number,
		alignOptions: PropTypes.oneOf(['left', 'center', 'right']),
	}

	static defaultProps = {
		theme: 'default',
		options: [],
		label: '',
		prompt: 'Select an option...',
		alignOptions: 'right',
		onSelectOption: () => {},
	}

	handleToggle = () => {
		this.setState(({ open }) => ({ open: !open }))
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
		const { open, hover, selection } = this.state
		const {
			label,
			options,
			onSelectOption,
			theme,
			prompt,
			columns,
			alignOptions,
		} = this.props
		return (
			<Wrapper>
				<ThemeProvider
					theme={open ? reverseTheme(themes[theme]) : themes[theme]}>
					<Fragment>
						<Container
							hover={hover}
							open={open}
							innerRef={wrapperRef => (this.wrapperRef = wrapperRef)}
							onMouseEnter={() => {
								this.setState({ hover: true })
							}}
							onMouseLeave={() => {
								this.setState({ hover: false })
							}}
							onMouseDown={this.handleToggle}>
							<ButtonLabel>{label.toUpperCase()}</ButtonLabel>
							<Flip in={open} component={<DropdownIcon />} />
						</Container>
						<PoseGroup>
							{open && (
								<OptionsCollection
									key="__container__"
									columns={columns}
									align={alignOptions}>
									<PromptText center>{prompt}</PromptText>
									{options.map(option => {
										const active = option.label === selection
										return (
											<Fragment key={option.label}>
												<Option
													onMouseDown={() => {
														onSelectOption(option)
														this.setState({
															selection: option.label,
														})
													}}>
													<Highlight
														highlightColor={option.activeColor}
														active={active}>
														<OptionText>
															{option.label.toUpperCase()}
														</OptionText>
														<Appear in={active} component={<CheckIcon />} />
													</Highlight>
												</Option>
											</Fragment>
										)
									})}
								</OptionsCollection>
							)}
						</PoseGroup>
					</Fragment>
				</ThemeProvider>
			</Wrapper>
		)
	}
}
