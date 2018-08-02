import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import AnimateHeight from 'react-animate-height'
import { H2, Form, Spinner, colors, shadows } from '../..'
import posed from 'react-pose'

const transition = {
	default: {
		ease: 'easeInOut',
		duration: 250,
	},
}

const Container = styled.div`
	box-shadow: ${props => props.shadow};
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	z-index: 2;
	align-items: stretch;
	min-width: 400px;
	transition: box-shadow 0.5s ease;
`

const Spacer = styled.div`
	margin-left: 24px;
`

const buttonContainerProps = {
	default: {
		backgroundColor: colors.primary,
		color: colors.white,
		borderColor: colors.primary,
		transition,
	},
	open: {
		backgroundColor: colors.white,
		color: colors.primary,
		borderColor: colors.primary,
		transition,
	},
	sending: {
		backgroundColor: colors.attention,
		color: colors.black,
		borderColor: colors.attention,
		transition,
	},
	complete: {
		backgroundColor: colors.complete,
		color: colors.black,
		borderColor: colors.complete,
		transition,
	},
	error: {
		backgroundColor: colors.warning,
		color: colors.black,
		borderColor: colors.warning,
		transition,
	},
}
const ButtonContainer = styled(posed.div(buttonContainerProps))`
	background: ${props => props.theme.bg};
	border: 2px solid ${props => props.theme.border};
	cursor: ${props => (props.pose === 'default' ? 'pointer' : 'default')};
	border-radius: 4px ${props => (props.pose === 'open' ? '4px 0 0' : '')};
	pointer-events: ${props => (props.pose === 'default' ? 'auto' : 'none')};
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 3;
	height: 56px;

	:hover {
		background: ${props => props.theme.fg};
		color: ${props => props.theme.bg};
	}
`

const ButtonLabel = styled(H2)`
	line-height: normal;
	color: inherit;
	white-space: nowrap;
`

const FormContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-content: stretch;
	align-items: stretch;
	padding: 24px;
`

export default class ButtonForm extends Component {
	state = {
		style: 'default',
	}

	static propTypes = {
		buttonLabel: PropTypes.shape({
			default: PropTypes.string.isRequired,
			open: PropTypes.string.isRequired,
			sending: PropTypes.string.isRequired,
			complete: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired,
		}).isRequired,
		formName: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
	}

	static defaultProps = {
		buttonLabel: {
			default: '',
			open: '',
			sending: '',
			complete: '',
			error: '',
		},
		onSubmit: () => {},
		onError: () => {},
		onComplete: () => {},
	}

	handleOpen = () => {
		this.setState({ style: 'open' })
	}

	handleClose = () => {
		this.setState({ style: 'default' })
	}

	handleSubmit = () => {
		this.props.onSubmit(this.handleComplete, this.handleError)
		this.setState({ style: 'sending' })
	}

	handleError = () => {
		this.props.onError()
		this.setState({ style: 'error' }, () => setTimeout(this.handleClose, 2000))
	}

	handleComplete = () => {
		this.props.onComplete()
		this.setState({ style: 'complete' }, () =>
			setTimeout(this.handleClose, 2000)
		)
	}

	render() {
		const { style } = this.state
		const { buttonLabel, formName, formFields } = this.props
		return (
			<Container shadow={style === 'open' ? shadows.focus : shadows.basic}>
				<ButtonContainer pose={style} open={open} onMouseDown={this.handleOpen}>
					<ButtonLabel>{buttonLabel[style].toUpperCase()}</ButtonLabel>
					{style === 'sending' && (
						<Spacer>
							<Spinner width={24} height={24} color={colors.black} />
						</Spacer>
					)}
				</ButtonContainer>
				<AnimateHeight height={style === 'open' ? 'auto' : 0} animateOpacity>
					<FormContainer>
						<Form
							formName={formName}
							formFields={formFields}
							onCancel={this.handleClose}
							onSubmit={this.handleSubmit}
						/>
					</FormContainer>
				</AnimateHeight>
			</Container>
		)
	}
}
