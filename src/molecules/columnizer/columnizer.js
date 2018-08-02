import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PoseGroup } from 'react-pose'
import { NavBar } from '../nav-bar'
import { colors, shadows } from '../..'

const Container = styled.div`
	width: ${props => `${props.width}px` || '100%'};
	background: ${colors.white};
	box-shadow: ${shadows.basic};
	position: relative;
	display: grid;
	grid-template-rows: 56px 1fr;
	grid-template-areas: 'header' 'content';
	transition: 0.2s ease;
	overflow: hidden;
	border-radius: 4px;
`

const HeaderNavBar = styled(NavBar)`
	grid-area: 'header';
`

export default class Columnizer extends Component {
	state = {
		activePageId: this.props.defaultPageId || this.props.pages[0].id,
	}

	static propTypes = {
		pages: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.any.isRequired,
				name: PropTypes.string.isRequired,
				disabled: PropTypes.bool,
				component: PropTypes.element.isRequired,
				childComponent: PropTypes.element,
			})
		),
		defaultPageId: PropTypes.any,
	}

	render() {
		const { activePageId } = this.state
		const { defaultPageId, navItems, pages } = this.props
		return (
			<Container>
				<HeaderNavBar
					fillWidth
					navItems={pages}
					defaultNavId={defaultPageId}
					onPageChange={activePageId => this.setState({ activePageId })}
				/>
				{pages.find(page => page.id === activePageId).component}
			</Container>
		)
	}
}
