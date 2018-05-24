import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';
import {
  TagCollection,
  MaterialIcon,
  Flip,
  Badge,
  colors,
  shadows
} from '../../';

// styling for container for drawer component
const DrawerContainer = styled.div`
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

/**
* styling for options collection, expanding when active, becoming more opaque
* when hovered, and adding a box shadow when active
**/
const optionsCollectionProps = {
  open: { height: 132 },
  closed: { height: 0 }
}
const OptionsCollection = styled(posed.div(optionsCollectionProps))`
  background: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.black};
  border-radius: 0 0 4px 4px;
  max-height: 254px;
  overflow-y: scroll;
  opacity: ${props => props.active || props.hover ? 1 : 0.2};
  box-shadow: ${props => props.hover || props.active ? shadows.basic : 0};
  transition: all .2s ease;
`

// drawer component with required [initialTags, badgeTheme] props
export default class Drawer extends Component {

  state = {
    active: false,
    tagCount: this.props.initialTags.length,
    hover: false,
    badgeTheme: this.props.badgeTheme,
  }

  static propTypes = {
    initialTags: PropTypes.arrayOf(PropTypes.object).isRequired,
    badgeTheme: PropTypes.string.isRequired,
  }

  static defaultProps = {
    badgeTheme: "primary",
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = (e) => {
    if (!this.wrapperRef.contains(e.target)) {
      this.setState({active: false})
    }
  }

  handleRemove = () => {
    this.setState(prevState => ({tagCount: prevState.tagCount - 1}))
  }

  handleAdd = () => {
    this.setState(prevState => ({tagCount: prevState.tagCount + 1}))
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

  render() {
    const { active, hover, tagCount, badgeTheme } = this.state
    const { initialTags } = this.props
    return (
      <DrawerContainer active={active} innerRef={wrapperRef => this.wrapperRef = wrapperRef}>
        <HeadContainer
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          active={active}
          hover={hover}
        >
          <TitleContainer>
              <Title>List</Title>
              <Flip in={active} component={<MaterialIcon>arrow_drop_down</MaterialIcon>} />
            </TitleContainer>
            <Badge theme={badgeTheme} value={tagCount} />
        </HeadContainer>
        <OptionsCollection
          active={active}
          hover={hover}
          pose={active ? 'open' : 'closed'}
        >
          <TagCollection
            onRemove={this.handleRemove}
            onAdd={this.handleAdd}
            initialTags={initialTags}
          />
        </OptionsCollection>
      </DrawerContainer>
    )
  }
}
