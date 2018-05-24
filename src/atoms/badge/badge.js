import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { P, colors, shadows } from '../../';

// themes for badge, accessed in component with bracket notation
const themes = {
  primary: {
    bg: colors.primary,
    fg: colors.white,
  },
  secondary: {
    bg: colors.secondary,
    fg: colors.black,
  },
  tertiary: {
    bg: colors.tertiary,
    fg: colors.black,
  },
  complete: {
    bg: colors.complete,
    fg: colors.black,
  },
  warning: {
    bg: colors.warning,
    fg: colors.black,
  },
  attention: {
    bg: colors.attention,
    fg: colors.black,
  }
}

// styling for badge container, using theme.bg for background
const BadgeContainer = styled.div`
  width: ${props => props.small ? 24 : 36}px;
  height: ${props => props.small ? 24 : 36}px;
  background: ${props => props.theme.bg};
  box-shadow: ${shadows.basic};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  user-select: none;
  transition: .2s ease;
`

// styling for badge value, using theme.fg for color
const Value = styled(P)`
  color: ${props => props.theme.fg};
  font-size: ${props => props.small ? 12 : 16}px;
`

// badge component, with required [theme, value] props
export default class Badge extends Component {

  static propTypes = {
    theme: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    small: PropTypes.bool,
  }

  static defaultProps = {
    theme: 'primary',
    value: 99,
  }

  render() {
    const { theme, value, small } = this.props
    return (
      <ThemeProvider theme={theme in themes ? themes[theme] : themes.primary}>
        <BadgeContainer small={small}>
          <Value small={small}>{value}</Value>
        </BadgeContainer>
      </ThemeProvider>
    )
  }
}
