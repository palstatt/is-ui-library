import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import {
	H4,
	Accent,
	Label,
	MaterialIcon,
	ValidationText,
	colors,
	shadows,
	themes,
} from '../..'
import posed, { PoseGroup } from 'react-pose'

const Container = styled.div`
	position: relative;
`

const InputContainer = styled.div`
	background: ${colors.white};
	color: ${props => props.theme.fg};
	border: 2px solid ${props => props.theme.border || colors.black};
	border-radius: 2px;
	display: flex;
	position: relative;
	justify-content: flex-start;
	align-items: center;
	height: 48px;
	padding: 0 8px;
	transition: 0.2s ease;
`

const Input = styled.input.attrs({
	autoComplete: 'false',
})`
	color: ${colors.black};
	font-size: 1em;
	outline: none;
	border: none;
	height: 100%;
	width: 100%;

	&::placeholder {
		color: ${colors.grey};
	}
`

const SearchIcon = styled(MaterialIcon).attrs({
	children: 'search',
})`
	margin-right: 8px;
	color: ${props => props.theme.label};
	transition: 0.2s ease;
`

const resultsContainerProps = {
	enter: { opacity: 1, transition: { default: { duration: 150 } } },
	exit: { opacity: 0, transition: { default: { duration: 150 } } },
}
const ResultsContainer = styled(posed.div(resultsContainerProps))`
	position: absolute;
	top: 80px;
	left: 0;
	width: 100%;
	box-shadow: ${shadows.basic};
	border-radius: 4px;
	z-index: 5;
`

const Result = styled.div`
	background: ${props => (props.selected ? colors.primary__bg : colors.white)};
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 64px;
	cursor: pointer;
	overflow: hidden;
`

const ResultText = styled(H4)`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-height: 1em;
	max-height: 3em;
	margin-left: 16px;
`

const ResultDescriptionText = styled(Accent)`
	overflow: hidden;
	text-align: right;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	max-height: 3em;
	max-width: 40%;
	margin-right: 16px;
`

export default class AutocompleteSearch extends Component {
	state = {
		input: '',
		valid: false,
		invalid: false,
		disabled: false,
		focused: false,
		validating: false,
		hover: false,
		cursor: 0,
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		options: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.any.isRequired,
				name: PropTypes.string.isRequired,
				description: PropTypes.string,
			})
		).isRequired,
		prompt: PropTypes.string.isRequired,
		errorMessage: PropTypes.string.isRequired,
		noResultText: PropTypes.string.isRequired,
		fetchData: PropTypes.func.isRequired,
		alwaysShowResult: PropTypes.bool,
	}

	static defaultProps = {
		placeholder: 'Input',
		label: 'Label',
		prompt: 'Valid input',
		errorMessage: 'Invalid input',
		noResultText: 'No results for',
		options: [],
		fetchData: () => {},
	}

	getTheme = () => {
		const { valid, pristine } = this.props
		const { invalid, disabled, focused, validating } = this.state
		switch (true) {
			case focused:
				return themes.focused
			case pristine:
				return themes.active
			case disabled:
				return themes.disabled
			case valid:
				return themes.complete
			case !valid:
				return themes.warning
			case validating:
				return themes.validating
			default:
				return themes.active
		}
	}

	handleType = e => {
		e.preventDefault()
		this.props.onValueChange(e.target.value)
		this.setState({ cursor: 1 })
	}

	handleSpecialKeys = e => {
		const { value, options } = this.props
		const { cursor } = this.state
		const listLimit = options.length
		if (e.key === 'ArrowUp' && cursor > 0) {
			e.preventDefault()
			this.setState(({ cursor }) => ({
				cursor: cursor - 1,
			}))
		} else if (e.key === 'ArrowDown' && cursor < listLimit) {
			e.preventDefault()
			this.setState(({ cursor }) => ({
				cursor: cursor + 1,
			}))
		} else if (e.key === 'Enter' && cursor > 0 && listLimit > 0) {
			e.preventDefault()
			this.props.onValueChange(options[cursor - 1].name)
			this.inputRef.blur()
		}
	}

	handleSelect = name => {
		this.props.onValidate()
		this.props.onValueChange(name)
		this.inputRef.blur()
	}

	handleBlur = () => {
		this.setState({
			focused: false,
			cursor: 0,
		})
	}

	handleFocus = () => {
		this.setState({ focused: true })
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			this.setState({ cursor: 1 })
			this.props.fetchData(this.props.value)
		}
	}

	render() {
		const theme = this.getTheme()
		const { input, focused, cursor, hover } = this.state
		const {
			label,
			value,
			valid,
			errorMessage,
			prompt,
			placeholder,
			pristine,
			noResultText,
			options,
			alwaysShowResult,
		} = this.props
		return (
			<ThemeProvider theme={theme}>
				<Container>
					{label.length > 0 && <Label>{label}</Label>}
					<InputContainer>
						<SearchIcon />
						<Input
							innerRef={inputRef => (this.inputRef = inputRef)}
							value={value}
							onChange={this.handleType}
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							onKeyDown={this.handleSpecialKeys}
							placeholder={placeholder}
						/>
					</InputContainer>
					<PoseGroup>
						{options.length > 0 ? (
							<Fragment key={'__container'}>
								{focused &&
									(value.length > 0 || alwaysShowResult) && (
										<ResultsContainer>
											{options.map((result, index) => (
												<Result
													key={result.id}
													onMouseDown={() => this.handleSelect(result.name)}
													selected={cursor - 1 === index}
													onMouseEnter={() =>
														this.setState({ cursor: index + 1 })
													}>
													<ResultText>{result.name}</ResultText>
													{result.description && (
														<ResultDescriptionText>
															{result.description}
														</ResultDescriptionText>
													)}
												</Result>
											))}
										</ResultsContainer>
									)}
							</Fragment>
						) : (
							<Fragment key={'__container'}>
								{focused &&
									value.length > 0 && (
										<ResultsContainer>
											<Result
												onMouseDown={() => this.handleSelect(value)}
												selected={true}>
												<ResultText>{`${noResultText} '${value}'`}</ResultText>
											</Result>
										</ResultsContainer>
									)}
							</Fragment>
						)}
					</PoseGroup>
					<ValidationText
						validationText={
							focused || pristine ? prompt : valid ? '' : errorMessage
						}
						isOpen={!valid || focused}
						onMouseEnter={() => this.setState({ hover: true })}
						onMouseLeave={() => this.setState({ hover: false })}
					/>
				</Container>
			</ThemeProvider>
		)
	}
}
