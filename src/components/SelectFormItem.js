import React from 'react';
import styled from 'styled-components';
import Row from './Row';

const ItemContainer = styled.div`
    margin-top: ${props => props.noMargin ? 0 : '1rem'}
`

export default function SelectFormItem(props) {
    const {
        children, onChange, value, label, direction, justify, alignItems, alignSelf, style, disabled, noMargin, selectStyle
    } = props;
    return (
        <Row direction={direction} justify={justify} alignItems={alignItems} alignSelf={alignSelf} style={style}>
            {   label && 
                <label style={{marginTop: 0}}>
                    {label}
                </label>
            }
            <ItemContainer noMargin={noMargin}>
                <select onChange={onChange} value={value} disabled={disabled} style={selectStyle}>
                    {children}
                </select>
            </ItemContainer>
        </Row>
    )
}