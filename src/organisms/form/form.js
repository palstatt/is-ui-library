import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import styled from 'styled-components';
import {
  H1,
  Button,
  MaterialIcon,
  colors,
  shadows,
  gradients
} from '../../';

const wrapperProps = {
  open: { width: '100%', height: '100%', delay: 100 },
  closed: { width: '80px', height: '120px' }
}
const Wrapper = styled(posed.div(wrapperProps))`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: ${gradients.l_to_r};
`

const CloseButton = styled(MaterialIcon).attrs({
  children: 'close',
  large: true,
})`
  color: ${colors.white};
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
`

const SubmitButton = styled(Button).attrs({
  types: 'submit',
  label: 'Submit',
})`

`

const formContainerProps = {
  enter: {
    y: '0%',
    opacity: 1,

 },
  exit: { y: '-100%', opacity: 0 }
}
const FormContainer = styled(posed.form(formContainerProps))`
  display: grid;
  grid-template-rows: 48px auto 56px;
  grid-template-areas: "header"
                       "content"
                       "footer";
  width: 50%;
  min-width: 600px;
  background: ${colors.bg_grey};
  border-radius: 8px;
  box-shadow: ${shadows.basic};
  padding: 24px;
`

const FormHeaderContainer = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`

const FormLabel = styled(H1)`
  font-size: 40px;
  margin-bottom: 8px;
`

const FormContentContainer = styled.div`
  margin-top: 16px;
  & > * {
    margin-bottom: 16px;
  }
`

const FormFooterContainer = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: flex-end;

  & > * {
    margin-left: 16px;
  }
`

const FullscreenBackground = ({onClick, ...props}) => (
  <Fragment>
    <Wrapper {...props} />
    <CloseButton onClick={onClick} />
  </Fragment>
)

export default class Form extends Component {

  state = {
    fullscreen: this.props.fullscreen,
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    fullscreen: PropTypes.bool,
  }

  static defaultProps = {
    label: 'Missing label',
    fullscreen: true,
  }

  clickHandler = () => {
    this.setState(({fullscreen}) => ({
      fullscreen: !fullscreen,
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
  }

  handleFormElementChange = (value, name) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { label, children } = this.props
    const { fullscreen } = this.state
    const bodyChildren = React.Children.toArray(children)
                          .filter(child => !child.props.footer)
    const footerChildren = React.Children.toArray(children)
                            .filter(child => child.props.footer)
    return (
      <FullscreenBackground
        onClick={this.clickHandler}
        pose={fullscreen ? 'open' : 'closed'}
      >
        <FormContainer
          pose={fullscreen ? 'enter' : 'exit'}
          onSubmit={this.handleSubmit}
        >
          <FormHeaderContainer>
            <FormLabel>{label}</FormLabel>
          </FormHeaderContainer>
          <FormContentContainer>
            {bodyChildren.map(child =>
              React.cloneElement(
                child,
                {valueChange: this.handleFormElementChange}
              )
            )}
          </FormContentContainer>
          <FormFooterContainer>
            {footerChildren}
            <SubmitButton />
          </FormFooterContainer>
        </FormContainer>
      </FullscreenBackground>

    )
  }
}
