import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { ValidationText, InputText, colors } from '../../';

// themes for input with validation component [active, focused, validating, disabled, complete, warning]
const themes = {
  active: {
    bg: colors.black,
    fg: colors.white,
    label: colors.black,
    icon: 'info',
  },
  focused: {
    bg: colors.primary,
    fg: colors.white,
    label: colors.black,
    icon: 'info',
  },
  validating: {
    bg: colors.primary,
    fg: colors.white,
    label: colors.black,
    icon: 'sync',
  },
  disabled: {
    bg: colors.lightest_grey,
    fg: colors.grey,
    label: colors.grey,
    icon: 'info',
  },
  complete: {
    bg: colors.complete,
    fg: colors.black,
    label: colors.black,
    icon: 'check_circle',
  },
  warning: {
    bg: colors.warning,
    fg: colors.black,
    label: colors.black,
    icon: 'error',
  },
}

// styling for input container
const InputContainer = styled.div`
  width: ${props => props.width ? `${props.width}px` : 'auto'};
  margin-bottom: 16px;

  & * {
    transition: .2s ease;
  }
`

/**
* input with validation component with required [label, placeholder, validationText] props
* and optional [width] prop which if present will make component inline
**/
export default class InputWithValidation extends Component {
  state = {
    valid: false,
    invalid: false,
    disabled: false,
    focused: false,
    validating: false,
    hover: false,
    value: '',
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    validationText: PropTypes.string.isRequired,
    width: PropTypes.number,
  }

  static defaultProps = {
    placeholder: 'Input',
    label: 'Label',
    validationText: 'Validation text',
  }

  getTheme = () => {
    const { valid, invalid, disabled, focused, validating } = this.state
    switch(true) {
      case disabled:
        return themes.disabled
      case valid:
        return themes.complete
      case invalid:
        return themes.warning
      case focused:
        return themes.focused
      case validating:
        return themes.validating
      default:
        return themes.active
    }
  }

  //handle validation logic here
  handleChange = (e) => {
    this.setState({value: e.target.value})
    //logic for validation
  }

  handleFocus = () => {
    this.setState({focused: true})
  }

  handleBlur = () => {
    this.setState({focused: false})
  }

  render() {
    const theme = this.getTheme()
    const { label, placeholder, validationText, width } = this.props
    const { disabled, value, focused, hover } = this.state
    return (
      <ThemeProvider theme={theme}>
        <InputContainer width={width}>
          <InputText
            value={value}
            label={label}
            placeholder={placeholder}
            active={!disabled}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          <ValidationText
            validationText={validationText}
            isOpen={focused || hover}
            onMouseEnter={() => this.setState({hover: true})}
            onMouseLeave={() => this.setState({hover: false})}
          />
        </InputContainer>
      </ThemeProvider>
    )
  }
}
