import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Snack from './snack'

const SnackCollectionContainer = styled.div`
	position: fixed;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	bottom: 0;
	min-height: 40px;
	padding: 16px 0 0 0;
	z-index: 500;
`

export default class SnackBar extends Component {
	state = {}

	static propTypes = {
		messages: PropTypes.arrayOf(
			PropTypes.shape({
				text: PropTypes.string.isRequired,
				id: PropTypes.any.isRequired,
				ts: PropTypes.number,
				temporary: PropTypes.bool,
				action: PropTypes.func,
				actionLabel: PropTypes.string,
			})
		).isRequired,
	}

	handleRemove = id => {
		this.props.removeMessage(id)
	}

	componentWillUnmount() {
		this.props.messages.map(({ id }) => this.props.removeMessage(id))
	}

	render() {
		const { messages } = this.props
		return (
			<SnackCollectionContainer>
				{messages &&
					messages.map(message => (
						<Snack
							temporary={message.temporary}
							key={message.id}
							ts={message.ts}
							message={message.text}
							handleRemove={() => this.handleRemove(message.id)}
							action={message.action}
							label={message.actionLabel}
						/>
					))}
			</SnackCollectionContainer>
		)
	}
}
