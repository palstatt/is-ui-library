import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Accent, FlatButton, colors, shadows } from '../..'

const SnackContainer = styled.div`
	background: ${colors.black};
	box-shadow: ${shadows.focus};
	position: relative;
	width: auto;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	height: 40px;
	cursor: pointer;
	margin-bottom: 16px;
	transition: 0.2s ease;
	overflow: hidden;
`

const ProgressBar = styled.span.attrs({
	style: ({ timer }) => ({
		width: `${timer * 10 - 10}%`,
	}),
})`
	background: ${colors.primary__light};
	position: absolute;
	bottom: 0;
	left: 0;
	height: 2px;
	transition: width 1s linear;
`

const Spacer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-left: 16px;
`

export default class Snack extends Component {
	state = {
		timer: 11,
	}

	tick = () => {
		if (this.state.timer <= 0) {
			this.props.handleRemove()
		} else {
			this.setState(({ timer }) => ({ timer: timer - 1 }))
		}
	}

	handleActionClick = e => {
		this.props.action()
		e.stopPropagation()
	}

	componentDidMount() {
		this.interval = this.props.temporary ? setInterval(this.tick, 1000) : null
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		const {
			message,
			handleRemove,
			temporary,
			action,
			label,
			...props
		} = this.props
		const { timer } = this.state
		return (
			<SnackContainer onClick={handleRemove} {...props}>
				<Accent color={colors.white}>{message}</Accent>
				{action && (
					<Spacer>
						<FlatButton onClick={this.handleActionClick} label={label} small />
					</Spacer>
				)}
				{temporary && <ProgressBar timer={timer} />}
			</SnackContainer>
		)
	}
}
