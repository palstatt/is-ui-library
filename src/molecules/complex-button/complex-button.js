import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { H3, colors } from '../../'

const defaultThemes = {
  default: {
    bg: colors.black,
    fg: colors.white,
  },
}

const ButtonContainer = styled.div`
  flex-direction: row${props => props.flip ? '-reverse' : ''};
  background: ${props => props.theme.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
`

const ButtonLabel = styled(H3)`
  color: ${props => props.theme.fg};
  margin-${props => props.flip ? 'left' : 'right'}: 8px;
  line-height: normal;
`

export default class ComplexButton extends Component {

  state = {
    status: 'available'
  }

  static propTypes = {
    flip: PropTypes.bool,
    label: PropTypes.string.isRequired,
    childComponent: PropTypes.element,
    customThemes: PropTypes.object,
  }

  static defaultProps = {
    label: ''
  }

  getTheme = () => {
    const { status } = this.state
    switch(status) {
      case 'available':
        return defaultThemes.default
      default:
        return defaultThemes.default
    }
  }

  render() {
    const { flip, label, childComponent, customTheme, ...props } = this.props
    const theme = !!customTheme ? customTheme : this.getTheme()
    return (
      <ThemeProvider theme={theme}>
        <ButtonContainer flip={flip} {...props}>
          <ButtonLabel>{label.toUpperCase()}</ButtonLabel>
          {childComponent}
        </ButtonContainer>
      </ThemeProvider>
    )
  }
}
