import dayjs from 'dayjs';
import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import InputFormItem from '../../../components/InputFormItem';
import Paper from '../../../components/Paper';
import Row from '../../../components/Row';
import SelectFormItem from '../../../components/SelectFormItem';

export default function AddOrEditReminder(props) {
    const { 
        reminders, selectedDay, handleClose, valuesToEdit, setSelectedReminder, 
        selectedYear, selectedMonth, addReminderAction, cities, selectedCity
    } = props;
    
    const dispatch = useDispatch()
    const [reminderToAddTitle, setReminderToAddTitle]             = useState('');
    const [reminderToAddTime, setReminderToAddTime]               = useState('');
    const [reminderToAddDescription, setReminderToAddDescription] = useState('');
    const [reminderToAddCity, setReminderToAddCity]                = useState('');
    const [reminderDay, setReminderDay]                           = useState(1);

    const close = useCallback(() => {
        setReminderToAddTitle('');
        setReminderToAddTime('');
        setReminderToAddDescription('');
        setReminderToAddCity('');
        handleClose()
    }, []);

    const handleReminderToEditDay = useCallback((evt) => {
        if( evt.target.value <= 0 || dayjs(`${selectedMonth}-1-${selectedYear}`).daysInMonth() < evt.target.value ) return;
        setReminderDay(evt.target.value)
    }, [selectedMonth, selectedYear]);

    const handleReminderToAdd = useCallback((evt) => {
        if( evt.target.value.length > 30) {
            return;
        }
        setReminderToAddTitle(evt.target.value)
    },[]);
    
    const handleReminderToAddTime = useCallback((evt) => {
        setReminderToAddTime(evt.target.value)
    }, []);
    
    const handleReminderToAddDescription = useCallback((evt) => {
        setReminderToAddDescription(evt.target.value);
    }, []);

    const handleReminderToAddCity = useCallback((evt) => {
        setReminderToAddCity(evt.target.value)
    }, [])
    
    const saveReminder = useCallback(() => {
        const newReminder = {
            title: reminderToAddTitle,
            time: reminderToAddTime,
            description: reminderToAddDescription,
            city: reminderToAddCity
        };

        if( valuesToEdit && +selectedDay === +reminderDay ) {
            const newRemindersArr = reminders[selectedYear][selectedMonth][selectedDay].map((reminder, idx) => 
                valuesToEdit.position === idx ? newReminder : reminder
            ).sort((a,b) => {
                if( a.time < b.time ) return -1;
                if( b.time < a.time) return 1;
                return 0;
            })
            ;

            dispatch(addReminderAction({ reminders: {
                ...reminders,
                [selectedYear]: {
                    ...reminders[selectedYear],
                    [selectedMonth]: {
                        ...reminders[selectedYear][selectedMonth],
                        [selectedDay]: newRemindersArr
                    }
                }
            }}))

            return close();
        } else if ( valuesToEdit && +selectedDay !== +reminderDay ) {
            const oldDayRemindersArr = reminders[selectedYear][selectedMonth][selectedDay].filter((reminder, idx) => 
                idx !== +valuesToEdit.position
            ).sort((a,b) => {
                if( a.time < b.time ) return -1;
                if( b.time < a.time) return 1;
                return 0;
            });

            const newDayRemindersArr = reminders[selectedYear]?.[selectedMonth]?.[reminderDay] 
                ? [...reminders[selectedYear][selectedMonth][reminderDay], newReminder]
                : [newReminder];
            
            dispatch(addReminderAction({ reminders: {
                ...reminders,
                [selectedYear]: {
                    ...reminders[selectedYear],
                    [selectedMonth]: {
                        ...reminders[selectedYear][selectedMonth],
                        [selectedDay]: oldDayRemindersArr,
                        [reminderDay]: newDayRemindersArr.sort((a,b) => {
                            if( a.time < b.time ) return -1;
                            if( b.time < a.time) return 1;
                            return 0;
                        })
                    }
                }
            }}));

            return close();
        }
        
        if( reminders?.[selectedYear]?.[selectedMonth]?.[selectedDay] ) {
            const newRemindersArr = [...reminders[selectedYear][selectedMonth][selectedDay], newReminder].sort((a,b) => {
                if( a.time < b.time ) return -1;
                if( b.time < a.time) return 1;
                return 0;
            });

            dispatch(addReminderAction({reminders: {
                ...reminders,
                [selectedYear]: {
                    ...reminders[selectedYear],
                    [selectedMonth]: {
                        ...reminders[selectedYear][selectedMonth],
                        [selectedDay]: newRemindersArr
                    }
                }
            }}));

            return close();
        } else if (!reminders?.[selectedYear]){
            dispatch(addReminderAction({reminders: {
                ...reminders,
                [selectedYear]: {
                    [selectedMonth]: {
                        [selectedDay]: [newReminder]
                    }
                }
            }}));

            return close();
        } else if (!reminders?.[selectedYear]?.[selectedMonth]) {
            dispatch(addReminderAction({reminders: {
                ...reminders,
                [selectedYear]: {
                    ...reminders[selectedYear],
                    [selectedMonth]: {
                        [selectedDay]: [newReminder]
                    }
                }
            }}));

            return close();
        } else {
            dispatch(addReminderAction({reminders: {
                ...reminders,
                [selectedYear]: {
                    ...reminders[selectedYear],
                    [selectedMonth]: {
                        ...reminders[selectedYear][selectedMonth],
                        [selectedDay]: [newReminder]
                    }
                }
            }}));
            
            return close();
        }
    }, [
        reminderToAddTitle, reminderToAddTime, reminderToAddDescription, reminderToAddCity,
        selectedDay, reminders, valuesToEdit, reminderDay
    ]);

    const cancel = useCallback(() => {
        if( valuesToEdit ) {
            setSelectedReminder();
            setReminderToAddTitle('');
            setReminderToAddTime('');
            setReminderToAddDescription('');
            return setReminderToAddCity('')
        };
        close();
    });

    useEffect(() => {
        if( valuesToEdit ) {
            setReminderToAddTitle(valuesToEdit.data.title)
            setReminderToAddTime(valuesToEdit.data.time)
            setReminderToAddDescription(valuesToEdit.data.description)
            setReminderToAddCity(selectedCity || valuesToEdit.data.city)
            setReminderDay(selectedDay)
        }
        if ( !valuesToEdit && selectedCity && cities.length ) {
            setReminderToAddCity(cities.find(city => +city.id === +selectedCity)?.name);
        }
    }, [valuesToEdit, selectedCity, cities]);

    return (
        <Row direction='column' justify='space-between' alignItems='center'>
            <h2 style={{margin: '1em'}}>{valuesToEdit ? 'Edit Reminder' : 'Add Reminder'}</h2>
            <Paper>
                {
                    cities.length ?
                    <SelectFormItem label='City:' 
                        value={reminderToAddCity} 
                        onChange={handleReminderToAddCity} 
                        direction='column'
                        noMargin
                        style={{marginTop: '1em'}}
                    >
                        <option disabled value='' />
                        {
                            cities.map(city => <option key={city.id} value={city.name}>{city.name}</option>)
                        }
                    </SelectFormItem>
                    : null
                }
                {
                    valuesToEdit 
                        ? <InputFormItem label='Reminder day' 
                            inputType='number' 
                            value={reminderDay} 
                            onChange={handleReminderToEditDay}
                            direction='column'
                        />
                        : null
                }
                <InputFormItem label='Reminder title' 
                    inputType='text' 
                    value={reminderToAddTitle} 
                    onChange={handleReminderToAdd} 
                    direction='column'
                />
                <InputFormItem label='Reminder description' 
                    inputType='text' 
                    value={reminderToAddDescription} 
                    onChange={handleReminderToAddDescription} 
                    direction='column'
                />
                <InputFormItem label='Time' 
                    inputType='time' 
                    value={reminderToAddTime} 
                    onChange={handleReminderToAddTime} 
                    direction='column'
                />
            </Paper>
            <Row direction='row' justify='space-between' alignItems='center'>
                <Button color='primary' disabled={!reminderToAddTitle || !reminderToAddTime} onClick={saveReminder}>
                    {valuesToEdit ? 'Edit' : 'Add'}
                </Button>
                <Button color='secondary' onClick={cancel}>
                    Cancel
                </Button>
            </Row>
        </Row>
    )
}