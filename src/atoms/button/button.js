import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { colors, shadows, H2 } from '../../';

// button themes [default, hover, clicked, disabled]
const themes = {
  default: {
    bg: colors.primary,
    fg: colors.white,
    border: colors.primary,
    shadow: shadows.basic,
  },
  hover: {
    bg: colors.white,
    fg: colors.primary,
    border: colors.primary,
    shadow: 'none',
  },
  clicked: {
    bg: colors.lightest_grey,
    fg: colors.primary,
    border: colors.primary,
    shadow: 'none',
  },
  disabled: {
    bg: colors.grey,
    fg: colors.lightest_grey,
    border: colors.grey,
    shadow: 'none',
  },
}

// styling for button container, wider when large prop passed
const ButtonContainer = styled.button`
  width: ${props => props.large ? 400 : 200}px;
  background: ${props => props.theme.bg};
  color: ${props => props.theme.fg};
  box-shadow: ${props => props.theme.shadow};
  border: 2px solid ${props => props.theme.border};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 56px;
  outline: transparent;
  cursor: pointer;
  transition: .1s ease;

  &:focus {
    outline: none;
  }

  & * {
    transition: .1s ease;
  }
`

// styling for button label
const ButtonLabel = styled(H2)`

`

// button component with required [label] prop and optional [disabled, large] props
export default class Button extends Component {

  state = {
    hover: false,
    clicked: false,
    disabled: this.props.disabled,
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    large: PropTypes.bool,
  }

  static defaultProps = {
    label: 'primary',
  }

  getTheme = () => {
    const { hover, disabled, clicked } = this.state
    switch(true) {
      case disabled:
        return themes.disabled
      case !disabled && !hover && !clicked:
        return themes.default
      case !disabled && hover && !clicked:
        return themes.hover
      case !disabled && hover && clicked:
        return themes.clicked
      default:
        return themes.default
    }
  }

  render() {
    const { label, ...props } = this.props
    const theme = this.getTheme()
    return(
      <ThemeProvider theme={theme}>
        <ButtonContainer
          onMouseEnter={() => this.setState({hover: true})}
          onMouseLeave={() => this.setState({hover: false, clicked: false})}
          onFocus={() => this.setState({hover: true})}
          onBlur={() => this.setState({hover: false, clicked: false})}
          onMouseDown={() => this.setState({clicked: true})}
          onMouseUp={() => this.setState({clicked: false})}
          {...props}
        >
          <ButtonLabel center>{label.toUpperCase()}</ButtonLabel>
        </ButtonContainer>
      </ThemeProvider>
    )
  }
}
