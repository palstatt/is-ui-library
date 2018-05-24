import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import styled from 'styled-components';
import {
  MaterialIcon,
  Flip,
  colors,
  shadows
} from '../../';
import DropdownOption from './dropdown-option';

// styling for container for dropdown component
const DropdownContainer = styled.div`
  outline: none;
  width: 400px;
  max-height: 310px;
  background: transparent;
  user-select: none;
  transition: .25s ease;
`

// styling for head container, changing background when component is active
const HeadContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 4px 4px 0 0;
  height: 56px;
  padding: 16px;
  cursor: pointer;
  background: ${props => props.active ? colors.lightest_grey : 'transparent'};
  transition: .2s ease;
`

// styling for title container
const TitleContainer = styled.div`
  display: inline-flex;
  align-items: center;
`

// styling for title
const Title = styled.p`
  color: inherit;
  margin: 0 16px 0 0;
  font-size: 1em;
  font-weight: bold;
`

const SelectionName = styled.p`
  color: ${props => props.hover ? colors.black : colors.light_grey};
  transition: .2s ease;
`

/**
* styling for options collection, expanding when active, becoming more opaque
* when hovered, and adding a box shadow when active
**/
const optionsCollectionProps = {
  open: { height: 254, staggerChildren: 50 },
  closed: { height: 0 }
}
const OptionsCollection = styled(posed.div(optionsCollectionProps))`
  background: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.black};
  border-radius: 0 0 4px 4px;
  height: ${props => props.height}px;
  max-height: 254px;
  overflow-y: scroll;
  opacity: ${props => props.active || props.hover ? 1 : 0.2};
  box-shadow: ${props => props.hover || props.active ? shadows.basic : 0};
  transition: all .2s ease;
`

/**
* container for option animation, translating on y axis when appearing
* and disappearing
**/
const PosedContainer = posed.div({
  open: { y: '0%' },
  closed: { y: '100%' }
})

// dropdown component with required [options, label] props
export default class Dropdown extends Component {

  state = {
    active: false,
    selectionIndex: null,
    hover: false,
    options: this.props.options,
  }

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    label: PropTypes.string.isRequired,
    valueChange: PropTypes.func,
  }

  static defaultProps = {
    options: [
      {
        name: 'No options listed',
        active: false,
      },
    ],
    maxSelected: 3,
    label: 'Missing label',
  }


  handleClickOutside = (e) => {
    if (!this.wrapperRef.contains(e.target)) {
      this.setState({active: false})
    }
  }

  handleClick = () => {
    this.setState(prevState => ({active: !prevState.active}))
  }

  handleMouseEnter = () => {
    this.setState({
      hover: true,
    })
  }

  handleMouseLeave = () => {
    this.setState({
      hover: false,
    })
  }

  handleToggle = (option) => {
    const { options } = this.state
    const { valueChange, name } = this.props
    const tagIndex = options.findIndex((i) => i === option)
    this.setState({
      selectionIndex: tagIndex,
    })
    valueChange(option, name)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  render() {
    const { active, hover, selectionIndex } = this.state
    const { label, options } = this.props
    return (
      <DropdownContainer
        active={active}
        innerRef={wrapperRef => this.wrapperRef = wrapperRef}
      >
        <HeadContainer
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          active={active}
          hover={hover}
        >
          <TitleContainer>
            <Title>{label}</Title>
            <Flip
              in={active}
              component={<MaterialIcon>arrow_drop_down</MaterialIcon>}
            />
          </TitleContainer>
          <SelectionName hover={hover}>
            {selectionIndex !== null ? options[selectionIndex].name : ''}
          </SelectionName>
        </HeadContainer>
        <OptionsCollection
          active={active}
          hover={hover}
          pose={active ? 'open' : 'closed'}
        >
            {options.map((option, index) =>
              <PosedContainer
                pose={active ? 'open' : 'closed'}
                key={option.name}
              >
                <DropdownOption
                  title={option.name}
                  active={index === selectionIndex}
                  toggle={() => this.handleToggle(option)}
                />
              </PosedContainer>
            )}
        </OptionsCollection>
      </DropdownContainer>
    )
  }
}
