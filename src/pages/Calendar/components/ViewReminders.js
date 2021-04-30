import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Paper from '../../../components/Paper';
import Row from '../../../components/Row';
import AddOrEditReminder from './AddOrEditReminder';
import dayjs from 'dayjs';

const ReminderLine = styled.p`
    margin-top: ${props => props.outlined ? 0 : '1em'};
    border-bottom: ${props => props.outlined ? '1px solid #D1D1A4' : 0};
    font-weight: ${props => props.outlined ? 'bold' : '100'}
`

const ViewRemindersContent = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; 
    overflow-y: auto;
    flex-direction: ${props => props.edit ? 'column' : 'row'};
`

export default function ViewReminders(props) {
    const { 
        reminders, setAddNewReminder, selectedDay, handleClose, selectedYear, 
        selectedMonth, addReminderAction, cities, selectedCity, deleteReminder
    } = props;

    const [selectedReminder, setSelectedReminder] = useState(null);

    return (
        <>
            <ViewRemindersContent edit={selectedReminder ? true : false}>
                {
                    selectedReminder ? null :
                    <>
                        <Row justify='center' style={{width: '100%', 'marginBottom': '2em'}}>
                            <h2>
                                {`Reminders ${dayjs(`${selectedMonth}-${selectedDay}-${selectedYear}`).format('DD/MMM/YYYY')}`}
                            </h2>
                        </Row>
                    </>
                }
                {
                    !selectedReminder ?
                    reminders[selectedYear][selectedMonth][selectedDay].map((reminder, idx) => 
                        <Row direction='column' justify='center' alignItems='space-evenly' 
                            key={`reminder-card-${selectedDay}-${idx}`} 
                        >
                            <Paper 
                                onClick={() => setSelectedReminder({data: reminder, position: idx})}
                                style={{
                                    background: '#FEF5BB',
                                    margin: '0.5em 1em',
                                    width: '350px',
                                    minHeight: '300px',
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                    cursor: 'pointer'
                                }}
                                color='#DADB97'
                            >
                                <ReminderLine outlined >{`${reminder.time} - ${reminder.title}`}</ReminderLine>
                                <ReminderLine outlined>{reminder.city}</ReminderLine>
                                <ReminderLine>{reminder.description}</ReminderLine>
                            </Paper>
                            <Button color='secondary' onClick={() => deleteReminder(idx)}>Delete</Button>
                        </Row>
                    )
                    : 
                    <AddOrEditReminder
                        cities={cities}
                        reminders={reminders}
                        selectedDay={selectedDay}
                        handleClose={handleClose}
                        valuesToEdit={selectedReminder}
                        setSelectedReminder={setSelectedReminder}
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        addReminderAction={addReminderAction}
                        selectedCity={selectedCity}
                    />
                }
            </ViewRemindersContent>
            <div>
                {
                    selectedReminder ? null :
                    <Button color='primary' onClick={() => setAddNewReminder(selectedDay)}>Add new reminder</Button>
                }
            </div>
        </>
    )
}