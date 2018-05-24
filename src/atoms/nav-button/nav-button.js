import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { H3, colors, shadows } from '../../';

// themes for nav buttons [active, default, disabled]
const themes = {
  active: {
    bg: colors.white,
    fg: colors.primary,
  },
  default: {
    bg: colors.lightest_grey,
    fg: colors.black,
  },
  disabled: {
    bg: colors.white,
    fg: colors.grey,
  },
}

/**
* styling for button container, changing background to white when active, adding box-shadow when active,
* using theme.fg for color
**/
const ButtonContainer = styled.div`
  width: ${props => props.stretchy ? '' : '160px'};
  background: ${props => props.theme.bg};
  color: ${props => props.theme.fg};
  box-shadow: ${props => props.active ? shadows.basic : ''};
  flex-grow: ${props => props.stretchy ? 1 : 0};
  flex-basis: 0;
  height: 56px;
  position: relative;
  display: flex;
  border-radius: 2px 2px 0 0;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  transition: .12s ease-in;

  & * {
    transition: .12s ease-in;
  }
`

/**
* styling for button underline (used when horizontal), appearing when hovered,
* expanding when active, using theme.fg for color
**/
const Underline = styled.span.attrs({
  content: '',
})`
  display: block;
  width: ${props => props.active ? 100 : 0}%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: ${props => props.theme.fg};

  ${ButtonContainer}:hover & {
    width: ${props => props.active ? 100 : 25}%;
  }
`
/**
* styling for button sideline (used when vertical), appearing when hovered,
* expanding when active, using theme.fg for color
**/
const Sideline = styled.span.attrs({
  content: '',
})`
  display: block;
  height: ${props => props.active ? 100 : 0}%;
  width: 2px;
  position: absolute;
  right: 0;
  background: ${props => props.theme.fg};

  ${ButtonContainer}:hover & {
    height: ${props => props.active ? 100 : 25}%;
  }
`

// navbutton component with required [title] prop
export default class NavButton extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    title: 'title',
    childComponent: null,
  }

  getTheme = () => {
    const { active } = this.props
    switch(true) {
      case active:
        return themes.active
      case !active:
        return themes.default
      default:
        return themes.disabled
    }
  }

  handleClick = () => {
    this.props.onClick()
  }

  render() {
    const theme = this.getTheme()
    const { title, active, vertical, stretchy, childComponent } = this.props
    return (
      <ThemeProvider theme={theme}>
        <ButtonContainer
          onClick={this.handleClick}
          active={active}
          stretchy={stretchy}
        >
          <H3 center>{title.toUpperCase()}</H3>
          {childComponent}
          {vertical
            ?
              <Sideline active={active}/>
            :
              <Underline active={active}/>
          }
        </ButtonContainer>
      </ThemeProvider>
    )
  }
}
