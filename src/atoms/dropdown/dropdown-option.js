import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  MaterialIcon,
  Appear,
  colors
} from '../../';

/**
* styling for option container, becoming grey when hovered and darker grey when
* selected and hovered
**/
const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 16px;
  background: inherit;
  transition: .15s ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${props => props.active
                  ? colors.light_grey
                  : colors.lightest_grey};
  }
`

// styling for option title container
const OptionTitleContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
`

// styling for option title
const OptionTitle = styled.p`
  color: inherit;
  margin: 0 0;
  font-size: 1em;
  user-select: none;
`

// option component with required [title] prop
export default class DropdownOption extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.toggle()
  }

  render() {
    const { title, active } = this.props
    return (
      <Fragment>
        <OptionContainer onClick={this.handleClick} active={active}>
          <OptionTitleContainer>
            <OptionTitle>{title}</OptionTitle>
          </OptionTitleContainer>
          <Appear
            in={active}
            component={<MaterialIcon color={colors.black}>check</MaterialIcon>}
          />
        </OptionContainer>
      </Fragment>
    )
  }
}
