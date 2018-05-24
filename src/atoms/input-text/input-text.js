import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H4, colors } from '../../';

//styling for label
const Label = styled(H4)`
  color: ${props => props.theme.label};
  margin: 0 ${props => props.labelLeft ? '8px 0' : '0 8px'} 0;
`

//styling for input text, using theme.bg for border color
const InputTextField = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  box-sizing: border-box;
  background: ${colors.white};
  margin: 0 0;
  border: solid 2px ${props => props.theme.bg};
  border-radius: 2px;
  height: 48px;
  padding: 12px;
  font-size: 18px;

  &::placeholder {
    color: ${colors.grey};
  }
`

//input text component with required [label, placeholder, active] props
const InputText = ({label, active, ...props}) => {
  return (
    <Fragment>
      <Label>{label}</Label>
      <InputTextField disabled={!active} {...props}/>
    </Fragment>
  )
}
InputText.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
}
InputText.defaultProps = {
  label: 'label',
  active: true,
  placeholder: 'Input',
}

export default InputText;
