import PropTypes from 'prop-types';
import styled from 'styled-components';

//styling for material icon component
const MaterialIcon = styled.i.attrs({
  className: 'material-icons',
  children: props => props.theme.icon || '',
})`
  user-select: none;
  font-size: ${props => props.large ? '32' : '24'}px;
  color: ${props => props.theme.fg ? props.theme.fg : props.color || 'black'};
  transform-origin: right center;
`
MaterialIcon.propTypes = {
  color: PropTypes.string,
}

export default MaterialIcon;
