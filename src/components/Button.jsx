import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  margin: 1em;
  padding: ${props => props.color === 'primary' ? '0.5em 3em' 
    : props.color === 'secondary' 
    ? '0.5em 1.5em' : 
    props.padding ? props.padding : ''
  };
  background: ${props => props.disabled ? 'grey' : 
    props.color === 'primary' ? '#3074B5' 
    : props.color === 'secondary' ? '#ca0707' : ''
  };
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: white;
  font-weight: bold;
  font-size: 1em;
  border-radius: 20px;
  border: 0;
`
function Button(props) {
  const { onClick, children, disabled, color } = props;

  return <StyledButton color={color} style={{margin: '1em'}} disabled={disabled} onClick={onClick}>{children}</StyledButton>;
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Button;
