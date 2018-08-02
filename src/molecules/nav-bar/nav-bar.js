import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavButton } from '../../'

// styling for nav container, changing direction if vertical prop = true
const NavContainer = styled.div`
	display: flex;
	width: ${props => (props.fillWidth ? '100%' : '')};
	flex-direction: ${props => (props.vertical ? 'column' : 'row')};
`

// nav bar component with required [navItems] prop and [vertical] prop
export default class NavBar extends Component {
	state = {
		activeNavId: this.props.defaultNavId || this.props.navItems[0].id,
	}

	static propTypes = {
		navItems: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.any.isRequired,
				name: PropTypes.string.isRequired,
				disabled: PropTypes.bool,
				childComponent: PropTypes.element,
			})
		).isRequired,
		vertical: PropTypes.bool,
		fillWidth: PropTypes.bool,
		onPageChange: PropTypes.func,
	}

	static defaultProps = {
		onPageChange: () => {},
	}

	handleClick = (id, name) => {
		this.setState({ activeNavId: id })
		this.props.onPageChange(id)
	}

	render() {
		const { vertical, navItems, fillWidth } = this.props
		const { activeNavId } = this.state
		return (
			<NavContainer vertical={vertical} fillWidth={fillWidth}>
				{navItems.map(({ id, name, disabled, childComponent }) => (
					<NavButton
						onClick={() => this.handleClick(id, name)}
						title={name}
						disabled={disabled}
						key={id}
						active={activeNavId === id}
						vertical={vertical}
						stretchy={fillWidth}
						childComponent={childComponent}
					/>
				))}
			</NavContainer>
		)
	}
}
