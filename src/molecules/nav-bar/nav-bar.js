import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavButton } from '../../';

// styling for nav container, changing direction if vertical prop = true
const NavContainer = styled.div`
  display: flex;
  width: ${props => props.fillWidth ? '100%' : ''};
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
`

// nav bar component with required [navItems] prop and [vertical] prop
export default class NavBar extends Component {

  state = {
    activeNav: 1,
  }

  static propTypes = {
    navItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    vertical: PropTypes.bool,
    fillWidth: PropTypes.bool,
    onPageChange: PropTypes.func
  }

  static defaultProps = {
    onPageChange: () => {},
  }

  handleClick = (id, name) => {
    this.setState({activeNav: id})
    this.props.onPageChange(name)
  }

  render() {
    const { vertical, navItems, fillWidth } = this.props
    const { activeNav } = this.state
    return (
      <NavContainer
        vertical={vertical}
        fillWidth={fillWidth}
      >
        {navItems.map(({id, name, childComponent}) =>
          <NavButton
            onClick={() => this.handleClick(id, name)}
            title={name}
            key={id}
            active={activeNav === id}
            vertical={vertical}
            stretchy={fillWidth}
            childComponent={childComponent}
          />
        )}
      </NavContainer>
    )
  }
}
