import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import posed from 'react-pose'
import AnimateHeight from 'react-animate-height'
import {
	H3,
	H4,
	TagCollection,
	MaterialIcon,
	Flip,
	Pill,
	colors,
	shadows,
} from '../../'

// styling for container for drawer component
const DrawerContainer = styled.div`
	outline: none;
	max-height: 310px;
	min-width: 400px;
	background: transparent;
	user-select: none;
	transition: 0.2s ease;
`

// styling for head container, changing background when component is active
const HeadContainer = styled.div`
	justify-content: ${props => (props.centered ? 'center' : 'space-between')};
	background: ${props => (props.active ? colors.lightest_grey : colors.white)};
	display: flex;
	align-items: center;
	width: 100%;
	border-radius: 4px 4px 0 0;
	height: ${props => (props.small ? 40 : 56)}px;
	padding: 16px;
	cursor: pointer;
	transition: 0.2s ease;
`

// styling for title container
const TitleContainer = styled.div`
	display: flex;
	align-items: center;

	& > * {
		margin-right: 8px;
	}
`

// styling for title
const Title = styled(H3)`
	color: inherit;
	line-height: normal;
`

const SmallTitle = styled(H4)`
	color: inherit;
	line-height: normal;
`

const PillContainer = styled.div``

/**
 * styling for options collection, expanding when active, becoming more opaque
 * when hovered, and adding a box shadow when active
 **/
const OptionsCollection = styled(AnimateHeight)`
	opacity: ${props => (props.open || props.hover ? 1 : 0.2)};
	box-shadow: ${props => (props.hover || props.active ? shadows.focus : 0)};
	background: ${colors.bg_grey};
	color: ${colors.black};
	border: 2px solid ${colors.black};
	border-radius: 0 0 4px 4px;
	max-height: 400px;
	overflow-y: scroll;
	transition: 0.2s ease;
`

const RenderCollection = ({ render, getValue }) => {
	return <Fragment>{render(getValue)}</Fragment>
}

// drawer component with required [initialTags, badgeTheme] props
export default class Drawer extends Component {
	state = {
		active: false,
		hover: false,
		value: null,
	}

	static propTypes = {
		badgeTheme: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		collectionComponent: PropTypes.element.isRequired,
		collection: PropTypes.array.isRequired,
		centeredHeader: PropTypes.bool,
		small: PropTypes.bool,
	}

	static defaultProps = {
		badgeTheme: 'primary',
		label: 'Label',
		collection: [],
	}

	getValue = value => {
		this.setState({
			value,
		})
	}

	handleClickOutside = e => {
		if (!this.wrapperRef.contains(e.target)) {
			this.setState({ active: false })
		}
	}

	handleClick = () => {
		this.setState(({ active }) => ({ active: !active }))
	}

	handleMouseEnter = () => {
		this.setState({
			hover: true,
		})
	}

	handleMouseLeave = () => {
		this.setState({
			hover: false,
		})
	}

	handleClearClick = e => {
		e.stopPropagation()
		this.props.clearAll()
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside)
	}

	render() {
		const { active, hover, tagCount, badgeTheme, value } = this.state
		const {
			label,
			collectionComponent,
			collection,
			centeredHeader,
			small,
			clearAll,
		} = this.props
		return (
			<DrawerContainer
				active={active}
				innerRef={wrapperRef => (this.wrapperRef = wrapperRef)}>
				<HeadContainer
					centered={centeredHeader}
					onMouseDown={this.handleClick}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					active={active}
					hover={hover}
					small={small}>
					<TitleContainer>
						{!small ? (
							<Title>{label.toUpperCase()}</Title>
						) : (
							<SmallTitle>{label.toUpperCase()}</SmallTitle>
						)}
						<Flip
							in={active}
							component={<MaterialIcon>arrow_drop_down</MaterialIcon>}
						/>
					</TitleContainer>
					{clearAll &&
						collection.length > 0 && (
							<PillContainer onMouseDown={this.handleClearClick}>
								<Pill value="CLEAR" theme="warning" id="clear" />
							</PillContainer>
						)}
					{value && (
						<PillContainer>
							<Pill value={value} id="value_pill" />
						</PillContainer>
					)}
				</HeadContainer>
				<OptionsCollection
					open={active}
					hover={hover}
					height={active && collection.length > 0 ? 'auto' : 0}>
					<RenderCollection
						collection={collection}
						getValue={this.getValue}
						render={getValue =>
							React.cloneElement(collectionComponent, {
								getValue,
							})
						}
					/>
				</OptionsCollection>
			</DrawerContainer>
		)
	}
}
