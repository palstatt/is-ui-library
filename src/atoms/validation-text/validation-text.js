import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';
import { MaterialIcon, P, colors } from '../../';

// styling for validation, using theme.fg for color [colors.black for default]
const Validation = styled(P)`
  color: ${props => props.theme.fg || colors.black};
  text-align: ${props => props.center ? 'center' : props.right ? 'right' : 'left'};
  overflow: hidden;
  margin: 0 8px;
  padding: 0;
  white-space: nowrap;
`

/**
*   styling for validation container, expanding when parent component is active or
*   validation is hovered
**/
const validationContainerProps = ({
  open: { width: '100%' },
  closed: { width: '40px' }
})
const ValidationContainer = styled(posed.div(validationContainerProps))`
  background: ${props => props.theme.bg};
  color: ${props => props.theme.fg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 32px;
  margin-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 2px;
  user-select: none;
  overflow: hidden;
`

// component validation text with required [validationText, isOpen] props
export default class ValidationText extends Component {

  static propTypes = {
    validationText: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired
  }

  static defaultProps = {
    validationText: 'Validation text...',
    isOpen: false,
  }

  render() {
    const { validationText, isOpen, ...props } = this.props
    const pose = isOpen ? 'open' : 'closed'
    return (
      <ValidationContainer pose={pose} {...props}>
        <MaterialIcon />
        <Validation pose={pose}>{validationText}</Validation>
      </ValidationContainer>
    )
  }
}
