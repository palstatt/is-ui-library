import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tag, AddTag } from '../../'

// styling for transition group
const TagCollectionContainer = styled.div`
	display: grid;
	width: 100%;
	min-width: 320px;
	grid-template-rows:
		${props => props.rowWidth || 'auto'}
		${props => props.rowWidth || 'auto'};
	grid-template-areas: 'tags' 'add-tag';
	justify-items: start;
	align-items: start;
`

const SavedTagsContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	grid-area: tags;
	flex-wrap: wrap;

	& > * {
		margin: 8px;
	}
`

const AddTagContainer = styled.div`
	grid-area: add-tag;

	& > * {
		margin: 8px;
	}
`

// tag collection component with required [collection, onAdd, onRemove] props
export default class TagCollection extends Component {
	state = {
		tags: [],
	}

	static propTypes = {
		tags: PropTypes.arrayOf(PropTypes.object).isRequired,
		getValue: PropTypes.func.isRequired,
	}

	static defaultProps = {
		getValue: () => {},
	}

	removeTag = tag => {
		this.setState(({ tags }) => ({
			tags: tags.filter(i => i !== tag),
		}))
	}

	addTag = tag => {
		const { tags } = this.state
		if (tags.every(x => x.key !== tag.key)) {
			this.setState(({ tags }) => ({
				tags: [...tags, tag],
			}))
			return false
		} else {
			return true
		}
	}

	componentDidMount() {
		this.setState({
			tags: this.props.tags,
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.tags !== this.state.tags) {
			this.props.getValue(`${this.state.tags.length} tags`)
		}
	}

	render() {
		const { tags } = this.state
		return (
			<TagCollectionContainer>
				<SavedTagsContainer>
					{tags.map(tag => (
						<Tag
							key={tag.key}
							theme={tag.theme}
							title={tag.name}
							onClick={() => this.removeTag(tag)}
						/>
					))}
				</SavedTagsContainer>
				<AddTagContainer>
					<AddTag add={tag => this.addTag(tag)} />
				</AddTagContainer>
			</TagCollectionContainer>
		)
	}
}
