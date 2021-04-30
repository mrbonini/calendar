import styled, { keyframes } from "styled-components"

export const CalendarHeaderTitle = styled.p`
    display: inline-block;
    margin: 0;
    width: 14%;
    text-align: center;
    margin-left: 1px;
    margin-right: 1px;
    color: #FFFFFF;
    font-size: 1.5em
`

export const CalendarHeaderContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #3074B5;
    margin-left: 1px;
    margin-right: 3px
`

export const CalendarBodyContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap
`

export const DayContainer = styled.div`
    border: 1px solid #9D9D9D;
    height: 100px;
    width: 14%;
    margin: 1px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.selected ? '0.5' : '1'};
    background: ${props => props.weekEnd ? '#F2F2F2' : '#FFFFFF'};
    position: relative;
    padding: 1.5em 0.25em 0.25em 0.25em
`

export const CalendarDate = styled.span`
    position: absolute;
    top: 5%;
    right: 5%;
    color: ${props => props.disabled ? '#A6A6A6' : props.weekEnd ? '#3074B5' : 'black'};
    font-weight: bold;
    margin: 0
`

export const CalendarWeather = styled.span`
    position: absolute;
    top: 5%;
    left: 5%;
    margin: 0
`
export const RemindersContainer = styled.div`
    word-break: break-all;
    margin-top: 0
`

export const Reminder = styled.p`
    margin-top: 0
` 