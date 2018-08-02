import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { H3, Pill, shadows, colors } from '../..'

const Container = styled.div`
	background-color: ${colors.white};
	box-shadow: ${shadows.basic};
	display: grid;
	grid-template-rows: 64px auto;
	grid-template-columns: 64px auto;
	grid-template-areas:
		'avatar description'
		'details details';
	grid-gap: 16px;
	padding: 16px;
	min-width: 320px;
	max-width: 480px;
	height: 96px;
	border-radius: 4px;
`

const Avatar = styled.img.attrs({
	alt: 'Avatar',
})`
	background: ${colors.primary};
	width: 64px;
	height: 64px;
	grid-area: avatar;
`

const DescriptionContainer = styled.div`
	grid-area: description;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
`

export default class UserCard extends Component {
	state = {}

	static propTypes = {
		name: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired,
	}

	static defaultProps = {
		name: 'User Name',
		status: 'available',
		time: 'a few moments ago',
	}

	render() {
		const { name, status, time } = this.props
		return (
			<Container>
				<Avatar />
				<DescriptionContainer>
					<H3>{name}</H3>
					<Pill
						value={status.toUpperCase()}
						description={time}
						id={`${name}_${status}`}
					/>
				</DescriptionContainer>
			</Container>
		)
	}
}
