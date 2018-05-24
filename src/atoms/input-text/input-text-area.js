import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { H4, colors } from '../../';

//styling for label
const Label = styled(H4)`
  color: ${props => props.theme.label};
  margin: 0 ${props => props.labelLeft ? '8px 0' : '0 8px'} 0;
  line-height: 16px;
`

//styling for input text, using theme.bg for border color
const StyledTextarea = styled(TextareaAutosize)`
  border: solid 2px ${props => props.theme.bg || colors.black};
  background: ${colors.white};
  font: inherit;
  width: 100%;
  margin: 0 0;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 12px;
  font-size: 14px;
  resize: none;

  &::placeholder {
    color: ${colors.grey};
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.labelLeft ? 'row' : 'column'};
  margin: 8px 0;
  width: 100%;
`

//input text component with required [label, placeholder, active] props
const InputTextArea = ({label, labelLeft, active, ...props}) => {
  return (
    <Container labelLeft={labelLeft}>
      <Label labelLeft={labelLeft}>{label.toUpperCase()}</Label>
      <StyledTextarea disabled={!active} {...props}/>
    </Container>
  )
}
InputTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
}
InputTextArea.defaultProps = {
  label: 'label',
  active: true,
  placeholder: 'Input',
}

export default InputTextArea;
