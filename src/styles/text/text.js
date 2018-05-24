import styled from 'styled-components';
import { colors } from '../../';

export const H1 = styled.h1.attrs({
  color: props => props.theme.fg || colors.black,
})`
  color: ${props => props.color};
  text-align: ${props => props.center ? 'center' : props.right ? 'right' : 'left'};
  font-size: 1.75rem;
  font-weight: bold;
  line-height: 3rem;
  margin: 0 0;
  padding: 0;
  user-select: none;
`

export const H2 = styled.h2.attrs({
  color: props => props.theme.fg || colors.black,
})`
  color: ${props => props.color};
  text-align: ${props => props.center ? 'center' : props.right ? 'right' : 'left'};
  font-size: 1.4375rem;
  font-weight: bold;
  line-height: 1.5rem;
  margin: 0 0;
  padding: 0;
  user-select: none;
`

export const H3 = styled.h3.attrs({
  color: props => props.theme.fg || colors.black,
})`
  color: ${props => props.color};
  text-align: ${props => props.center ? 'center' : props.right ? 'right' : 'left'};
  font-size: 1.1875rem;
  font-weight: bold;
  line-height: 1.5rem;
  margin: 0 0;
  padding: 0;
  user-select: none;
`

export const H4 = styled.h4.attrs({
  color: props => props.theme.fg || colors.black,
})`
  color: ${props => props.color};
  text-align: ${props => props.center ? 'center' : props.right ? 'right' : 'left'};
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.5rem;
  margin: 0 0;
  padding: 0;
  user-select: none;
`

export const P = styled.p.attrs({
  color: props => props.theme.fg || colors.black,
})`
  color: ${props => props.color};
  text-align: ${props => props.center ? 'center' : props.right ? 'right' : 'left'};
  margin: 0 0;
  padding: 0;
  user-select: none;
`

export const Accent = styled.p.attrs({
  color: props => props.theme.fg || colors.black,
})`
  color: ${props => props.color};
  text-align: ${props => props.center ? 'center' : props.right ? 'right' : 'left'};
  font-size: 14px;
  line-height: 14px;
  margin: 0 0;
  padding: 0;
  user-select: none;
`

export default P;
