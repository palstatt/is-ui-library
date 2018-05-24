import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, shadows, P } from '../../';

// styling for card container
const CardContainer = styled.div`
  height: 200px;
  width: 240px;
  background: ${colors.white};
  box-shadow: ${shadows.basic};
`

// styling for color box
const ColorBox = styled.div`
  background: ${props => props.color};
  height: 50%;
  width: 100%;
`

// styling for text container
const TextContainer = styled.div`
  background: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-transform: capitalize;
  width: 100%;
  height: 50%;
  padding: 16px;
`

// styling for cards collection
const CardsCollection = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: auto auto auto;
  align-items: center;
  justify-content: space-around;
`

// color card component with required [color, colorName] props
export class ColorCard extends Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
    colorName: PropTypes.string.isRequired,
  }

  render() {
    const { color, colorName } = this.props
    return (
      <CardContainer>
        <ColorBox color={color} />
        <TextContainer>
          <P>{color.toUpperCase()}</P>
          <P>{colorName}</P>
        </TextContainer>
      </CardContainer>
    )
  }
}

// color card collection component
export const ColorCardCollection = () => {
  return (
    <CardsCollection>
      {Object.entries(colors).map((color) =>
        <ColorCard color={color[1]}
          colorName={color[0].toString().replace('_', ' ')} />
        )}
      </CardsCollection>
  )
}
export default ColorCard;
