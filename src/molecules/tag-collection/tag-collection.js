import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import { Tag, AddTag } from '../../';

// styling for transition group
const TagCollectionContainer = styled.div`
  display: grid;
  padding: 8px;
  width: 100%;
  min-width: 320px;
  grid-template-columns: ${props => props.columnWidth || '50%'}
                         ${props => props.columnWidth || '50%'};
  grid-gap: 8px;
  justify-items: start;
  align-items: start;
  margin-bottom: 8px;
`

const PosedTagContainer = posed.div({
  enter: {opacity: 1},
  exit: {opacity: 0},
})

// tag collection component with required [initialTags, onAdd, onRemove] props
export default class TagCollection extends Component {

  state = {
    tags: this.props.initialTags,
  }

  static propTypes = {
    initialTags: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // empty functions to avoid error on no props
    onAdd: () => {},
    onRemove: () => {},
  }

  removeTag = tag => {
    this.setState(({tags}) => ({
      tags: tags.filter(i => i !== tag),
    }))
    this.props.onRemove()
  }

  addTag = (tag) => {
    const { tags } = this.state
    if (tags.every((x) => x.key !== tag.key)) {
      this.setState(({tags}) => ({
        tags: [
          ...tags,
          tag
        ],
      }))
      this.props.onAdd()
      return false
    } else {
      return true
    }
  }

  render() {
    const { tags } = this.state
    return (
      <TagCollectionContainer>
        <PoseGroup>
          {tags.map((tag) =>  <PosedTagContainer key={tag.key}>
                                <Tag
                                   theme={tag.theme}
                                   title={tag.name}
                                   onClick={() => this.removeTag(tag)}
                                />
                              </PosedTagContainer>
          )}
        </PoseGroup>
        <AddTag add={(tag) => this.addTag(tag)} />
      </TagCollectionContainer>
    )
  }
}
