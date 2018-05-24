import React from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

//transition constants
const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const WideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const duration = {
  appear: 100,
  rotate: 150,
  remove: 150,
  grow: 150,
  flip: 150,
  dropIn: 100,
  pageChange: 200,
}

const defaultStyle = {
  appear: {
    transition: `${duration.appear}ms ease-in`,
    opacity: 0,
    width: 0,
  },
  rotate: {
    transition: `${duration.rotate}ms ease-in`,
    transform: 'rotate(0)',
  },
  remove: {
    transition: `${duration.remove}ms ease-out`,
    opacity: 1,
  },
  grow: {
    transition: `${duration.grow}ms ease-in`,
    width: 0,
  },
  flip: {
    transition: `${duration.flip}ms ease-out`,
    transform: 'rotate(0)',
  },
  dropIn: {
    transition: `${duration.dropIn}ms ease-out`,
    transform: 'translateY(0px)',
    opacity: 0,
  },
  pageChange: {
    transition: `${duration.pageChange}ms ease-in-out`,
    height: 0,
    opacity: 0,
  }
}

const transitionStyles = {
  appear: {
    entering: { opacity: 0, width: 0 },
    entered: { opacity: 1, width: 24 },
  },
  rotate: {
    entering: { transform: "rotate(0deg)" },
    entered: { transform: "rotate(90deg)" },
  },
  remove: {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  },
  grow: {
    entering: { width: 0 },
    entered: { width: "7em" },
  },
  flip: {
    entering: { transform: "rotate(0deg)" },
    entered: { transform: "rotate(180deg)" },
  },
  dropIn: {
    entering: { transform: 'translateY(-16px)', opacity: 0 },
    entered: { transform: 'translateY(0px)', opacity: 1 },
    exiting: { transform: 'translateY(0px)', opacity: 0 },
    exited: { transform: 'translateY(0px)', opacity: 0 },
  },
  pageChange: {
    entering: { height: 0, opacity: 0 },
    entered: { height: 'auto', opacity: 1 },
    exiting: { height: 'auto', opacity: 1 },
    exited: { height: 0, opacity: 0 }
  }
}

//transitions
export const Appear = ({ in: inProp, component, ...props }) => (
  <Transition
    in={inProp}
    timeout={duration.appear}
    mountOnEnter
    unmountOnExit
    {...props}
  >
    {(state) => (
      <Container
        style={{
          ...defaultStyle.appear,
          ...transitionStyles.appear[state],
        }}
      >
        {component}
      </Container>
    )}
  </Transition>
)

export const Rotate = ({in: inProp, component, onClick }) => (
  <Transition
    in={inProp}
    timeout={duration.rotate}
  >
    {(state) => (
      <Container
        onClick={onClick}
        style={{
          ...defaultStyle.rotate,
          ...transitionStyles.rotate[state],
        }}
      >
        {component}
      </Container>
    )}
  </Transition>
)

export const Remove = ({in: inProp, component }) => (
  <Transition
    in={inProp}
    timeout={duration.remove}
    unmountOnExit
  >
    {(state) => (
      <Container
        style={{
          ...defaultStyle.remove,
          ...transitionStyles.remove[state],
        }}
      >
          {component}
      </Container>
    )}
  </Transition>
)

export const Grow = ({in: inProp, component }) => (
  <Transition
    in={inProp}
    timeout={duration.grow}
    mountOnEnter
    unmountOnExit
  >
    {(state) => (
      <Container
        style={{
          ...defaultStyle.grow,
          ...transitionStyles.grow[state],
        }}
      >
          {component}
      </Container>
    )}
  </Transition>
)

export const Flip = ({in: inProp, component, onClick }) => (
  <Transition
    in={inProp}
    timeout={duration.flip}
  >
    {(state) => (
      <Container
        onClick={onClick}
        style={{
          ...defaultStyle.flip,
          ...transitionStyles.flip[state],
        }}
      >
        {component}
      </Container>
    )}
  </Transition>
)

export const DropIn =  ({in: inProp, component }) => (
  <Transition
    in={inProp}
    timeout={duration.dropIn}
  >
    {(state) => (
      <WideContainer
        style={{
          ...defaultStyle.dropIn,
          ...transitionStyles.dropIn[state],
        }}
      >
        {component}
      </WideContainer>
    )}
  </Transition>
)

export const PageChange = ({in: inProp, component }) => (
  <Transition
    in={inProp}
    timeout={duration.pageChange}
  >
    {(state) => (
      <WideContainer
        style={{
          ...defaultStyle.pageChange,
          ...transitionStyles.pageChange[state],
        }}
      >
        {component}
      </WideContainer>
    )}
  </Transition>
)

export default Appear;
