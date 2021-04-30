import React from 'react';
import styled from 'styled-components';
import Row from './Row';

const ItemContainer = styled.div`
    margin-top: ${props => props.noMargin ? 0 : '1rem'}
`
export default function InputFormItem(props) {
    const { 
        label, inputType, onChange, value, maxLength, 
        direction, justify, alignItems, alignSelf, style 
    } = props;

    return (
        <Row direction={direction} justify={justify} alignItems={alignItems} alignSelf={alignSelf} style={style}>
            <ItemContainer>
                <label>{label}:</label>
            </ItemContainer>
            <ItemContainer noMargin>
                <input value={value} maxLength={maxLength} type={inputType} onChange={onChange} />
            </ItemContainer>
        </Row>
    )
}