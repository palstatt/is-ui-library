import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
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

const Container = styled.div`
	position: relative;
`

const InputContainer = styled.div`
	background: ${colors.white};
	color: ${props => props.theme.fg};
	border: 2px solid ${props => props.theme.border || colors.black};
	width: ${props => props.width || 400}px;
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
	top: calc(100% + 8px);
	left: 0;
	width: ${props => props.width || 400}px;
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
	line-height: normal;
	max-height: 2em;
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

export default class AutocompleteSearchSA extends Component {
	state = {
		value: '',
		valid: false,
		invalid: false,
		disabled: false,
		focused: false,
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
		noResultText: PropTypes.string.isRequired,
		width: PropTypes.number,
		fetchData: PropTypes.func,
	}

	static defaultProps = {
		label: 'missing label',
		placeholder: 'missing placeholder',
		noResultText: 'No results for',
		fetchData: () => {},
	}

	handleType = e => {
		const { value } = e.target
		e.preventDefault()
		this.setState({ value, cursor: 1 })
	}

	handleBlur = () => {
		this.setState({
			focused: false,
			cursor: 0,
		})
	}

	handleSpecialKeys = e => {
		const { options } = this.props
		const { value, cursor } = this.state
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
			this.setState({ value: options[cursor - 1].name })
			this.inputRef.blur()
		}
	}

	handleFocus = () => {
		this.setState({ focused: true })
	}

	handleSelect = value => {
		this.setState({ value })
	}

	getTheme = () => {
		const { valid, pristine } = this.props
		const { invalid, disabled, focused, validating } = this.state
		switch (true) {
			case focused:
				return themes.focused
			case disabled:
				return themes.disabled
			default:
				return themes.active
		}
	}

	fetchOptions = () => {}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.value !== this.state.value) {
			this.setState({ cursor: 1 })
			this.props.fetchData(this.state.value)
		}
	}

	render() {
		const theme = this.getTheme()
		const { value, focused, cursor } = this.state
		const { options, placeholder, width, label, noResultText } = this.props
		return (
			<ThemeProvider theme={theme}>
				<Container>
					{label.length > 0 && <Label>{label}</Label>}
					<InputContainer width={width}>
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
									value.length > 0 && (
										<ResultsContainer width={width}>
											{options.map((option, index) => {
												const selected = cursor - 1 === index
												return (
													<Result
														key={option.id}
														onMouseDown={() => this.handleSelect(option.name)}
														selected={selected}
														onMouseEnter={() =>
															this.setState({ cursor: index + 1 })
														}>
														<ResultText>{option.name}</ResultText>
														{option.description && (
															<ResultDescriptionText>
																{option.description}
															</ResultDescriptionText>
														)}
													</Result>
												)
											})}
										</ResultsContainer>
									)}
							</Fragment>
						) : (
							<Fragment key={'__container'}>
								{focused &&
									value.length > 0 && (
										<ResultsContainer width={width}>
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
				</Container>
			</ThemeProvider>
		)
	}
}
