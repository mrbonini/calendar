import React from 'react';
import styled from 'styled-components';

const StyledPaper = styled.div`
    border: 1px solid lightgrey;
    padding: 1em;
    border-radius: 10px;
    box-shadow: ${props => props.color ? `4px 4px ${props.color}` : '4px 4px #888888'};
    ${props => props.style ? Object.entries(props.style).map(entry => entry[0] + ':' + entry[1]).toString().replaceAll(",", ";") : ''}
`

// entry[0] + ':' + entry[1]
export default function Paper(props) {
    const {
        children, color, style, onClick
    } = props;

    return (
        <StyledPaper color={color} style={style} onClick={onClick}>
            {children}
        </StyledPaper>
    )
}