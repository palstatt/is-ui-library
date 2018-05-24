import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MaterialIcon, Accent } from '../../'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const InfoFieldLabel = styled(Accent)`
  margin-left: 8px;
  color: ${props => props.color};
`

export default class InfoField extends Component {

  state = {

  }

  static propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    nameColor: PropTypes.string
  }

  render() {
    const { icon, name, iconColor, nameColor } = this.props
    return (
      <Container>
        <MaterialIcon color={iconColor}>{icon}</MaterialIcon>
        <InfoFieldLabel color={nameColor}>{name.toUpperCase()}</InfoFieldLabel>
      </Container>
    )
  }
}
