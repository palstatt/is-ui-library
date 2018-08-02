import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import styled from 'styled-components'
import { MaterialIcon, Flip, P, colors, shadows } from '../../'
import DropdownOption from './dropdown-option'

// styling for container for dropdown component
const DropdownContainer = styled.div`
	outline: none;
	position: relative;
	width: auto;
	max-width: 400px;
	background: transparent;
	user-select: none;
	transition: 0.2s ease;
`

// styling for head container, changing background when component is open
const HeadContainer = styled.div`
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	border-radius: 4px 4px 0 0;
	height: 56px;
	padding: 16px;
	cursor: pointer;
	background: ${props => (props.open ? colors.lightest_grey : 'transparent')};
	transition: 0.2s ease;
`

// styling for title container
const TitleContainer = styled.div`
	display: inline-flex;
	align-items: center;
	width: 100%;
	justify-content: ${props => (props.spread ? 'space-between' : 'center')};
`

// styling for title
const Title = styled.span`
	color: ${props => props.theme.border || 'inherit'};
	margin: 0 16px 0 0;
	font-size: 1em;
	font-weight: bold;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`

const ValueEm = styled.span`
	color: ${props => (props.active ? colors.primary : colors.black)};
	font-size: 1em;
	font-weight: bold;
	transition: 0.2s ease;
`

const SelectionName = styled.em`
	color: ${props => (props.hovered ? colors.black : colors.light_grey)};
	transition: 0.2s ease;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	margin-left: 8px;
`

/**
 * styling for options collection, expanding when open, becoming more opaque
 * when hovereded, and adding a box shadow when open
 **/
const optionsCollectionProps = {
	open: { height: 168, flip: true },
	closed: { height: 0 },
}
const OptionsCollection = styled(posed.div(optionsCollectionProps))`
	background: ${colors.white};
	color: ${colors.black};
	border: 2px solid ${colors.black};
	opacity: ${props => (props.open || props.hovered ? 1 : 0.2)};
	box-shadow: ${props => (props.hovered || props.open ? shadows.basic : 0)};
	height: ${props => props.height}px;
	position: absolute;
	top: 56px;
	width: 100%;
	max-width: inherit;
	border-radius: 0 0 4px 4px;
	max-height: 172px;
	overflow-y: scroll;
	z-index: 10;
	transition: all 0.2s ease;
`

/**
 * container for option animation, translating on y axis when appearing
 * and disappearing
 **/
const PosedContainer = posed.div({
	open: { y: '0' },
	closed: { y: '-80px' },
})

// dropdown component with required [options, label] props
export default class Dropdown extends Component {
	state = {
		open: false,
		selectionIndex: null,
		hovered: false,
	}

	static propTypes = {
		options: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
			})
		).isRequired,
		label: PropTypes.string.isRequired,
		dynamicLabel: PropTypes.func,
		valueChange: PropTypes.func,
		nullOption: PropTypes.shape({
			id: PropTypes.any.isRequired,
			title: PropTypes.string.isRequired,
		}),
	}

	static defaultProps = {
		options: [
			{
				name: 'No options listed',
				selected: false,
			},
		],
		maxSelected: 3,
		label: 'Missing label',
	}

	handleClickOutside = e => {
		if (!this.wrapperRef.contains(e.target)) {
			this.setState({ open: false })
		}
	}

	handleClick = () => {
		this.setState(prevState => ({ open: !prevState.open }))
	}

	handleMouseEnter = () => {
		this.setState({
			hovered: true,
		})
	}

	handleMouseLeave = () => {
		this.setState({
			hovered: false,
		})
	}

	handleToggle = id => {
		this.props.onValueChange(id)
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside)
	}

	componentDidUpdate(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({ open: false })
		}
	}

	render() {
		const { open, hovered } = this.state
		const {
			value,
			label,
			options,
			dynamicLabel,
			nullOption,
			noNullSelect,
		} = this.props
		const selectedOption = options.find(option => option.id === value)
		return (
			<DropdownContainer
				open={open}
				innerRef={wrapperRef => (this.wrapperRef = wrapperRef)}>
				<HeadContainer
					onClick={this.handleClick}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					open={open}
					hovered={hovered}>
					{dynamicLabel ? (
						<Fragment>
							<TitleContainer spread>
								<Title>
									{dynamicLabel(
										<ValueEm active={open || hovered}>
											{value !== 0 && selectedOption ? selectedOption.name : ''}
										</ValueEm>
									)}
								</Title>
								<Flip
									in={open}
									component={
										<MaterialIcon color={colors.black}>
											arrow_drop_down
										</MaterialIcon>
									}
								/>
							</TitleContainer>
						</Fragment>
					) : (
						<Fragment>
							<TitleContainer>
								<Title>{label}</Title>
								<Flip
									in={open}
									component={
										<MaterialIcon color={colors.black}>
											arrow_drop_down
										</MaterialIcon>
									}
								/>
							</TitleContainer>
							<SelectionName hovered={hovered}>
								{value !== 0 && selectedOption ? selectedOption.name : ''}
							</SelectionName>
						</Fragment>
					)}
				</HeadContainer>
				<OptionsCollection
					open={open}
					hovered={hovered}
					pose={open ? 'open' : 'closed'}>
					{nullOption && (
						<PosedContainer
							pose={open ? 'open' : 'closed'}
							key={'__nullOption__'}>
							<DropdownOption
								disabled={noNullSelect}
								title={nullOption.title}
								selected={nullOption.id === value}
								onToggle={() =>
									!noNullSelect && this.handleToggle(nullOption.id)
								}
							/>
						</PosedContainer>
					)}
					{options.map((option, index) => (
						<PosedContainer pose={open ? 'open' : 'closed'} key={option.name}>
							<DropdownOption
								title={option.name}
								selected={option.id === value}
								onToggle={() => this.handleToggle(option.id)}
							/>
						</PosedContainer>
					))}
				</OptionsCollection>
			</DropdownContainer>
		)
	}
}
