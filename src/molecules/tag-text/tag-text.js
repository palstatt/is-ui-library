import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import {
	MaterialIcon,
	OptionDropdown,
	Drawer,
	Pill,
	DatePicker,
	colors,
	shadows,
} from '../..'

const types = {
	DATE: 'DATE',
	DATE_RANGE: 'DATE_RANGE',
	TEXT: 'TEXT',
}

const Wrapper = styled.div``

const Container = styled.div`
	background: ${colors.white};
	color: ${colors.black};
	border: 2px solid ${colors.black};
	box-shadow: ${shadows.basic};
	border-radius: 2px;
	display: flex;
	position: relative;
	justify-content: flex-start;
	align-items: center;
	height: 52px;
	transition: 0.2s ease;
	margin-bottom: 8px;
`

const InputContainer = styled.div`
	position: relative;
	display: grid;
	grid-gap: 8px;
	grid-template-columns: auto 1fr auto;
	width: 100%;
	height: auto;
	align-self: stretch;
	padding: 8px;
`

const Input = styled.input`
	color: ${colors.black};
	font-size: 1em;
	outline: none;
	border: none;
	height: 100%;
	width: 100%;

	&::placeholder {
		color: ${colors.grey};
	}
	&[type='date'] {
		font-family: inherit;
	}
`

const AddIcon = styled(MaterialIcon).attrs({
	children: 'add',
})`
	color: ${colors.primary};
	align-self: center;
	cursor: pointer;
`

const PillContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 8px;

	& > :not(:last-child) {
		margin-right: 8px;
	}
`

const PillCollection = ({ filters, removeFilter }) => (
	<PillContainer>
		{filters.map(({ id, filter, text }) => (
			<Pill
				key={id}
				id={id}
				value={filter.label}
				theme="complete"
				description={text}
				inline
				removeable
				onRemove={removeFilter}
			/>
		))}
	</PillContainer>
)

const InputElement = ({
	selectedFilter,
	selectionId,
	handleKeyPress,
	handleChange,
	handleChangeStateObject,
	value,
}) => {
	if (selectedFilter)
		switch (selectedFilter.inputType) {
			case types.DATE:
				return (
					<DatePicker
						value={value}
						handleChangeValue={handleChange}
						dateType={DatePicker.dateTypes.TODAY_TO}
					/>
				)
			case types.DATE_RANGE:
				return (
					<DatePicker
						value={value}
						handleChangeValue={handleChangeStateObject}
						dateType={DatePicker.dateTypes.RANGE}
					/>
				)
			case types.TEXT:
			default:
				return (
					<Input
						type="text"
						placeholder={
							selectedFilter
								? selectedFilter.prompt
								: 'Select filter type first...'
						}
						onKeyPress={handleKeyPress}
						onChange={e => handleChange(e.target.value)}
						value={value}
					/>
				)
		}
	return null
}

export default class TagText extends Component {
	state = {
		selectedFilter: null,
		value: null,
		activeFilters: [],
	}

	static propTypes = {
		options: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				inputType: PropTypes.string.isRequired,
				prompt: PropTypes.string.isRequired,
			})
		),
		defaultLabel: PropTypes.string.isRequired,
	}

	static types = types

	handleKeyPress = e => {
		const { selectedFilter, value } = this.state
		if (e.key === 'Enter') {
			this.addFilter(selectedFilter, value)
		}
	}

	changeFilter = filter => {
		this.setState({ selectedFilter: filter, value: filter.defaultValue })
		// this.inputRef.focus()
	}

	handleChange = newValue => {
		this.setState({ value: newValue })
	}

	handleChangeStateObject = newValue => {
		this.setState(({ value }) => ({
			value: { ...value, ...newValue },
		}))
	}

	addFilter = (filter, value) => {
		const { activeFilters } = this.state
		let text = ''
		const formatDate = date => moment(date).format('MM/DD/YY')
		switch (filter.inputType) {
			case types.TEXT:
				text = value
				break
			case types.DATE:
				text = formatDate(value)
				break
			case types.DATE_RANGE:
				text = `${formatDate(value.startDate)} to ${formatDate(value.endDate)}`
				break
			default:
				text = ''
				break
		}
		const newTag = { id: `${filter.label}: ${text}`, filter, text }
		if (!activeFilters.some(filter => filter.id === newTag.id)) {
			this.setState(prevState => ({
				activeFilters: [{ ...newTag }, ...prevState.activeFilters],
				value: null,
				selectedFilter: null,
			}))
		}
	}

	removeFilter = id => {
		if (id) {
			this.setState(({ activeFilters }) => ({
				activeFilters: activeFilters.filter(i => i.id !== id),
			}))
		}
	}

	clearFilters = () => {
		this.setState({ activeFilters: [] })
	}

	render() {
		const { selectedFilter, value, activeFilters } = this.state
		const { options, defaultLabel } = this.props
		return (
			<Wrapper>
				<Container>
					<InputContainer>
						<OptionDropdown
							label={defaultLabel.toUpperCase()}
							theme="primary"
							options={options}
							selectionId={selectedFilter ? selectedFilter.id : null}
							changeFilter={this.changeFilter}
						/>
						<InputElement
							selectedFilter={selectedFilter}
							selectionId={selectedFilter ? selectedFilter.id : null}
							handleKeyPress={this.handleKeyPress}
							handleChange={this.handleChange}
							handleChangeStateObject={this.handleChangeStateObject}
							value={value}
						/>
						{value && (
							<AddIcon onClick={() => this.addFilter(selectedFilter, value)} />
						)}
					</InputContainer>
				</Container>
				<Drawer
					label={'current filters'}
					collectionComponent={
						<PillCollection
							filters={activeFilters}
							removeFilter={this.removeFilter}
						/>
					}
					collection={activeFilters}
					clearAll={this.clearFilters}
					small
				/>
			</Wrapper>
		)
	}
}
