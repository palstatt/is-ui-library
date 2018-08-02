import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
	MaterialIcon,
	OptionDropdown,
	Drawer,
	Pill,
	colors,
	shadows,
} from '../..'

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
				value={filter}
				theme="complete"
				description={text}
				inline
				removeable
				onRemove={removeFilter}
			/>
		))}
	</PillContainer>
)

export default class TagText extends Component {
	state = {
		selectionId: null,
		value: '',
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
	}

	handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.addFilter(this.state.selectionId, this.state.value)
		}
	}

	changeFilter = selectionId => {
		this.setState({ selectionId, value: '' })
		this.inputRef.focus()
	}

	addFilter = (filter, text) => {
		const newTag = { id: `${filter}: ${text}`, filter, text }
		const { activeFilters } = this.state
		if (!activeFilters.some(filter => filter.id === newTag.id)) {
			this.setState(prevState => ({
				activeFilters: [{ ...newTag }, ...prevState.activeFilters],
				value: '',
				selectionId: null,
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
		const { selectionId, value, activeFilters } = this.state
		const { options } = this.props
		const selectedFilterType = options.find(
			option => option.label === selectionId
		)
		return (
			<Wrapper>
				<Container>
					<InputContainer>
						<OptionDropdown
							label="filter"
							theme="primary"
							options={options}
							selectionId={selectionId}
							changeFilter={this.changeFilter}
						/>
						<Input
							innerRef={ref => (this.inputRef = ref)}
							type={selectedFilterType ? selectedFilterType.inputType : 'text'}
							placeholder={
								selectedFilterType
									? selectedFilterType.prompt
									: 'Select filter type first...'
							}
							disabled={selectionId === null}
							onKeyPress={this.handleKeyPress}
							onChange={e =>
								this.setState({
									value: e.target.value,
								})
							}
							value={value}
						/>
						{value.length > 0 && (
							<AddIcon onClick={() => this.addFilter(selectionId, value)} />
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
