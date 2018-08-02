import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { UserCard } from '../..'

const CollectionContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	padding: 8px;

	& > * {
		margin: 8px;
		flex-grow: 1;
	}
`

export default class CardCollection extends Component {
	state = {}

	static propTypes = {
		users: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				status: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
			}).isRequired
		).isRequired,
	}

	componentDidMount() {
		this.props.getValue(
			`${
				this.props.users.filter(user => user.status === 'available').length
			} available`
		)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.users !== this.props.users) {
			this.props.getValue(
				`${
					this.props.users.filter(user => user.status === 'available').length
				} available`
			)
		}
	}

	render() {
		const { users } = this.props
		return (
			<CollectionContainer>
				{users.map(user => (
					<UserCard
						key={user.name}
						name={user.name}
						status={user.status}
						description={user.description}
					/>
				))}
			</CollectionContainer>
		)
	}
}
