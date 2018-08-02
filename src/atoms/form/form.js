import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FlatButton, Divider, H3, colors } from '../..'

const FormContainer = styled.form`
	display: inline-grid;
	position: relative;
	grid-template-columns: 1fr 1fr;
	width: 100%;
	grid-gap: 16px;
`

const FormFooter = styled.div`
	justify-self: end;
	margin: 16px 0;
	align-self: center;
	grid-column: 1 / span 2;

	& > * {
		margin-left: 16px;
	}
`

const FieldContainer = styled.div`
	grid-column: span ${props => props.span || 2};
`

const SectionContainer = styled.div`
	grid-column: 1 / span 2;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
`

const Field = ({
	render,
	value,
	section,
	valid,
	pristine,
	span,
	errorMessage,
	prompt,
}) => {
	return (
		<FieldContainer span={span}>
			{render(value, valid, pristine, prompt, errorMessage)}
		</FieldContainer>
	)
}

export default class Form extends Component {
	constructor(props) {
		super(props)
		let initialFieldState = {}
		this.props.formFields.map(field => {
			if (!field.section) {
				const hidden = field.hide ? field.hide : false
				return (initialFieldState[field.fieldName] = {
					value: field.defaultValue,
					hidden,
					validation: field.validation,
					required: field.required,
					pristine: !field.defaultValue.length > 0,
					valid: false,
					errorMessage: '',
				})
			}
		})
		this.state = {
			fields: initialFieldState,
			valid: false,
		}
	}

	static propTypes = {
		formName: PropTypes.string.isRequired,
		formFields: PropTypes.arrayOf(
			PropTypes.shape({
				fieldName: PropTypes.string,
				hide: PropTypes.bool,
				section: PropTypes.string,
				span: PropTypes.oneOf([1, 2]),
				component: PropTypes.element,
				defaultValue: PropTypes.any,
				required: PropTypes.bool,
				validation: PropTypes.shape({
					rules: PropTypes.arrayOf(
						PropTypes.shape({
							rule: PropTypes.func,
							failureMessage: PropTypes.string,
						})
					),
					prompt: PropTypes.string,
				}),
			})
		).isRequired,
		submitButtonLabel: PropTypes.string,
		noCancel: PropTypes.bool,
		onSubmit: PropTypes.func.isRequired,
		onCancel: PropTypes.func.isRequired,
	}

	static defaultProps = {
		onSubmit: () => {},
		onCancel: () => {},
	}

	updateField = (fieldName, newState, callback = () => {}) => {
		this.setState(
			prevState => ({
				fields: {
					...prevState.fields,
					[fieldName]: { ...prevState.fields[fieldName], ...newState },
				},
			}),
			callback
		)
	}

	validationFieldCheck = fieldName => {
		const { value, pristine, validation, required, hidden } = this.state.fields[
			fieldName
		]
		if (required && validation.rules && !pristine) {
			let result = true
			let message = ''
			validation.rules.every(({ rule, failureMessage }) => {
				result = rule(value) && result
				message = failureMessage
				return result
			})
			result
				? this.handleValidate(fieldName)
				: this.handleInvalidate(fieldName, message)
			this.validationFormCheck
		}
	}

	validationFormCheck = () => {
		const { fields } = this.state
		let formValidity = true
		Object.entries(fields).map(field => {
			if (field[1].required && !field[1].hidden)
				formValidity = formValidity && field[1].valid
		})
		this.setState({ valid: formValidity })
	}

	handleValidate = fieldName => {
		this.updateField(fieldName, { valid: true, errorMessage: '' }, () =>
			this.validationFormCheck()
		)
	}

	handleInvalidate = (fieldName, errorMessage) => {
		this.updateField(fieldName, { valid: false, errorMessage }, () =>
			this.setState({ valid: false })
		)
	}

	handleClear = () => {
		const { fields } = this.state
		Object.entries(fields).map(field => {
			this.updateField(field[0], { value: '', pristine: true })
		})
		this.setState({ valid: false })
	}

	handleClose = () => {
		this.handleClear()
		this.props.onCancel()
	}

	handleChange = (fieldName, newValue, callback = () => {}) => {
		this.updateField(fieldName, { value: newValue, pristine: false }, () => {
			callback()
			this.validationFieldCheck(fieldName)
		})
	}

	handleSubmit = e => {
		const { fields } = this.state
		e.preventDefault()
		this.props.onSubmit(fields)
		this.handleClear()
	}

	componentDidUpdate(prevProps) {
		const { formFields } = this.props
		const { fields } = this.state
		if (prevProps.formFields !== formFields) {
			let newFieldState = {}
			formFields.map(field => {
				if (!field.section) {
					const { fieldName } = field
					const oldField = prevProps.formFields.find(
						x => x.fieldName === fieldName
					)
					if (
						field.hidden !== oldField.hidden ||
						field.validation !== oldField.validation ||
						field.required !== oldField.required
					) {
						const targetField = fields[fieldName]
						const hidden = field.hide ? field.hide : false
						return (newFieldState[fieldName] = {
							...targetField,
							hidden,
							validation: field.validation,
							required: field.required,
						})
					}
				}
			})
			this.setState(({ fields }) => ({
				fields: { ...fields, ...newFieldState },
			}))
		}
	}

	componentDidMount() {
		const { fields } = this.state
		Object.entries(fields).map(field => {
			this.validationFieldCheck(field[0])
		})
		this.validationFormCheck()
	}

	render() {
		const { valid } = this.state
		const { formName, formFields, submitButtonLabel, noCancel } = this.props
		return (
			<FormContainer name={formName} onSubmit={this.handleSubmit}>
				{formFields.map(
					({
						fieldName,
						hide,
						section,
						component,
						defaultValue,
						valueType,
						span,
						validation,
						horizontalRule,
						...props
					}) =>
						section ? (
							<SectionContainer key={section}>
								{horizontalRule && <Divider />}
								<H3>{section.toUpperCase()}</H3>
							</SectionContainer>
						) : (
							!hide && (
								<Field
									key={fieldName}
									span={span}
									prompt={validation.prompt}
									errorMessage={this.state.fields[fieldName].errorMessage}
									value={this.state.fields[fieldName].value}
									valid={this.state.fields[fieldName].valid}
									pristine={this.state.fields[fieldName].pristine}
									render={(value, valid, pristine, prompt, errorMessage) =>
										React.cloneElement(component, {
											value,
											valid,
											pristine,
											prompt,
											errorMessage,
											onValueChange: (newValue, callback) =>
												this.handleChange(fieldName, newValue, callback),
											onValidate: () => this.handleValidate(fieldName),
											onInvalidate: () => this.handleInvalidate(fieldName),
										})
									}
									{...props}
								/>
							)
						)
				)}
				<FormFooter>
					{!noCancel && (
						<FlatButton
							label="cancel"
							type="button"
							onClick={this.handleClose}
							color={colors.black}
						/>
					)}
					<FlatButton
						disabled={!valid}
						label={submitButtonLabel || 'submit'}
						type="submit"
						onRightClick={this.logFields}
						margin={'0 0 0 16px'}
					/>
				</FormFooter>
			</FormContainer>
		)
	}
}
