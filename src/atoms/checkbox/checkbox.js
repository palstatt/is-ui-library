import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import posed from 'react-pose';
import { MaterialIcon, P, colors } from '../../';

// themes for checkbox [checked, hoverDefault, hoverChecked, default, disabled]
const themes = {
  checked: {
    bg: colors.white,
    fg: colors.primary,
    border: colors.primary,
    label: colors.grey,
  },
  hoverDefault: {
    bg: colors.white,
    fg: colors.grey,
    border: colors.black,
    label: colors.black,
  },
  hoverChecked: {
    bg: colors.white,
    fg: colors.primary,
    border: colors.primary,
    label: colors.primary,
  },
  default: {
    bg: colors.white,
    fg: colors.white,
    border: colors.black,
    label: colors.grey,
  },
  disabled: {
    bg: colors.light_grey,
    fg: colors.light_grey,
    border: colors.grey,
    label: colors.light_grey,
  },
}

// posed container for animating the scale of the check icon
const containerProps = {
    active: { scale: 1 },
    inactive: { scale: 0 },
}
const PosedContainer = styled(posed.div(containerProps))`
  display: flex;
  justify-content: center;
  align-items: center;
`
const CheckIcon = ({ pose }) => (
  <PosedContainer pose={pose}>
    <MaterialIcon>check</MaterialIcon>
  </PosedContainer>
)

// styling for container of entire checkbox component
const CheckboxContainer = styled.div`
  flex-direction: row${props => props.right ? '-reverse' : ''};
  justify-content: flex-${props => props.right ? 'end' : 'start'};
  display: flex;
  align-items: center;
  cursor: pointer;
`

// styling for hidden checkbox input for form data
const CheckboxRef = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  visibility: visible;
  white-space: nowrap;
`

/**
* styling for checkbox button, moving the margin based on the position of
* the label,
**/
const CheckboxButton = styled.div`
  background: ${props => props.theme.bg};
  border: 2px solid ${props => props.theme.border};
  margin-${props => props.right ? 'right' : 'left'}: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  transition: .1s ease;
`

// styling for checkbox label, using theme.label for color
const CheckboxLabel = styled(P)`
  color: ${props => props.theme.label};
  transition: .1s ease;
`

// checkbox component with required [label] prop and optional [disabled, right] props
export default class Checkbox extends Component {

  state = {
    checked: false,
    hover: false,
    disabled: this.props.disabled,
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    right: PropTypes.bool,
  }

  static defaultProps = {
    label: 'Label',
    disabled: false,
    right: false,
  }

  getTheme = () => {
    const { checked, hover, disabled } = this.state
    switch(true) {
      case disabled:
        return themes.disabled
      case !disabled && hover && !checked:
        return themes.hoverDefault
      case !disabled && !hover && checked:
        return themes.checked
      case !disabled && hover && checked:
        return themes.hoverChecked
      case !disabled && !hover && !checked:
        return themes.default
      default:
        return themes.default
    }
  }

  render() {
    const { checked, disabled } = this.state
    const { label, right } = this.props
    const theme = this.getTheme()
    return (
      <ThemeProvider theme={theme}>
        <CheckboxContainer
          onClick={() => this.setState(({checked}) => ({checked: !checked}))}
          onMouseEnter={() => this.setState({hover: true})}
          onMouseLeave={() => this.setState({hover: false})}
          right={right}
          disabled={disabled}
        >
          <CheckboxRef checked={checked} />
          <CheckboxLabel>{label}</CheckboxLabel>
          <CheckboxButton right={right}>
            <CheckIcon pose={checked ? 'active' : 'inactive'} />
          </CheckboxButton>
        </CheckboxContainer>
      </ThemeProvider>
    )
  }
}
