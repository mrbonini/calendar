import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Modal from '../../components/Modal';
import { 
  CalendarBodyContainer, CalendarDate, CalendarHeaderContainer, CalendarHeaderTitle, 
  CalendarWeather, 
  DayContainer, Reminder, RemindersContainer 
} from './style';
import { weekDaysName, months } from './dateConstants';
import AddOrEditReminder from './components/AddOrEditReminder';
import ViewReminders from './components/ViewReminders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faSun, faSnowflake, faCloudRain, faSpinner } from '@fortawesome/free-solid-svg-icons'


import dayjs from 'dayjs';
import * as actions from './slice/actions';
import * as selectors from './slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import citiesJson from '../../assets/city.list.min.json';
import Row from '../../components/Row';
import SelectFormItem from '../../components/SelectFormItem';

const loadCities = () => cloneDeep(citiesJson);

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative 
  const dispatch = useDispatch();
  const today = dayjs();
  const [selectedDay, setSelectedDay]                           = useState(null);
  const [selectedMonth, setSelectedMonth]                       = useState(months.indexOf(months[dayjs().month()])+1);
  const [selectedYear, setSelectedYear]                         = useState(dayjs().year());
  const [addNewReminder, setAddNewReminder]                     = useState(null);
  const [dayToRenderCalendar, setDayToRenderCalendar]           = useState(dayjs(`${selectedMonth}-2-${selectedYear}`));
  const [selectedCountry, setSelectedCountry]                   = useState('');
  const [selectedCity, setSelectedCity]                         = useState('');
  const [selectedTemperature, setSelectedTemperature]           = useState('metric');

  const weather = useSelector(selectors.selectWeatherData);
  const reminders = useSelector(selectors.selectCalendarReminders);
  const view = useSelector(selectors.selectView);

  const countries = useMemo(() => {
    setSelectedCity('')
    dispatch(actions.controlView({ isLoading: true }));
    const loadedCities = loadCities();
    const countriesArr = [];
    loadedCities.forEach(city => countriesArr.includes(city.country) ? null : countriesArr.push(city.country));
    dispatch(actions.controlView({ isLoading: false }));
    return countriesArr.sort();
  }, []);

  const filteredCities = useMemo(() => {
    dispatch(actions.controlView({ isLoading: true }));
    const loadedCities = loadCities();
    if( selectedCountry ) {
      const citiesArr = loadedCities.filter(city => city.country === selectedCountry)
        .sort((a, b) => {
          if( a.name < b.name ) return -1;
          if( b.name < a.name) return 1;
          return 0;
        });
      dispatch(actions.controlView({ isLoading: false }));
      return citiesArr;
    };
    dispatch(actions.controlView({ isLoading: false }));
    return [];
  }, [countries, selectedCountry]);
  
  const monthDays = useMemo(() => {
    const numberOfDays = dayjs(dayToRenderCalendar).daysInMonth();
    return new Array(numberOfDays).fill(null);
  }, [dayToRenderCalendar]);
  
  const monthDaysToSkip = useMemo(() => {
    const monthFirstWeekDay = dayjs(dayToRenderCalendar).date(1).day();
    
    return new Array(monthFirstWeekDay).fill(null);
  }, [dayToRenderCalendar]);
  

  const monthDaysToComplete = useMemo(() => {
    const monthFirstWeekDay = dayjs(dayToRenderCalendar).date(1).day();
    if( monthFirstWeekDay === 1 && monthDays?.length === 28) return [];
    if( monthFirstWeekDay > 5 ) return new Array(42 - monthDays.length - monthDaysToSkip.length).fill(null)
    
    return new Array(35 - monthDays.length - monthDaysToSkip.length).fill(null)
  }, [monthDaysToSkip, dayToRenderCalendar, monthDays]);

  const yearsOptions = useMemo(() => {
    const years = [];
    for(let i = 0; i < 10; i++) {
      years.push(dayjs().year() + i)
    }
    return years;
  }, []);

  const handleClose = useCallback(() => {
    setSelectedDay(null);
    setAddNewReminder(null);
  }, []);

  const checkWeekEnd = useCallback((date) => {
    return dayjs(date).day() === 0 || dayjs(date).day() === 6 ? true : false;
  },[]);

  const handleSelectYear = useCallback((evt) => {
    setSelectedYear(evt.target.value)
  }, []);

  const handleSelectMonth = useCallback((evt) => {
    setSelectedMonth(evt.target.value)
  }, []);

  const handleSelectCountry = useCallback((evt) => {
    if( evt.target.value !== selectedCountry ) {
      setSelectedCity('');
    };
    setSelectedCountry(evt.target.value);
  }, []);

  const handleSelectCity = useCallback((evt) => {
    setSelectedCity(evt.target.value);
  }, []);

  const handleSelectTemperature = useCallback(evt => {
    setSelectedTemperature(evt.target.value);
  },[]);

  const deleteReminder = useCallback((idx) => {
    const newRemindersArr = reminders[selectedYear][selectedMonth][selectedDay].filter(( rem,i ) => i !== idx );
    
    dispatch(actions.controlData({
      reminders: {
          ...reminders,
          [selectedYear]: {
              ...reminders[selectedYear],
              [selectedMonth]: {
                  ...reminders[selectedYear][selectedMonth],
                  [selectedDay]: newRemindersArr
              }
          }
        }
      }));
  }, [reminders, selectedYear, selectedMonth, selectedDay]);



  useEffect(() => {
    if( dayToRenderCalendar !== dayjs(`${selectedMonth}-2-${selectedYear}`) ){
      setDayToRenderCalendar(dayjs(`${selectedMonth}-2-${selectedYear}`))
    };
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if( selectedCity ) {
      dispatch(actions.getWeatherData(selectedCity, selectedTemperature));
    }
  }, [selectedCity, selectedTemperature]);

  return (
    <div className="container">
      <Modal open={view.isLoading} contentStyle={{
          background: '#010101',
          opacity: 0.7,
          'max-height': '100%', 
          'max-width': '100%', 
          width: '100%', 
          height: '100%'
        }}
      >
        <FontAwesomeIcon icon={faSpinner} size='5x' spin={true} />
      </Modal>
      <Modal open={selectedDay ? true : false} handleClose={handleClose}>
        {
          reminders?.[selectedYear]?.[selectedMonth]?.[selectedDay]?.length && !addNewReminder 
          ? <ViewReminders 
            cities={filteredCities}
            selectedDay={selectedDay}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setAddNewReminder={setAddNewReminder} 
            reminders={reminders}
            handleClose={handleClose}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            addReminderAction={actions.controlData}
            selectedCity={selectedCity}
            deleteReminder={deleteReminder}
          />
          : <AddOrEditReminder
              cities={filteredCities}
              reminders={reminders}
              selectedDay={selectedDay}
              handleClose={handleClose}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              addReminderAction={actions.controlData}
              selectedCity={selectedCity}
            />
        }
      </Modal>
      <Row alignItems='center' justify='space-between' >
        <SelectFormItem label='Contry:' 
          onChange={handleSelectCountry} 
          value={selectedCountry} 
          noMargin selectStyle={{marginLeft: '0.5em'}}
          alignItems='center'
        >
          {
            countries?.length && countries.map(country => <option key={country} value={country}>{country}</option>)
          }
        </SelectFormItem>
        <SelectFormItem label='City:' 
          onChange={handleSelectCity} 
          value={selectedCity} 
          disabled={!selectedCountry} 
          noMargin
          selectStyle={{marginLeft: '0.5em'}}
          alignItems='center'
        >
          <option disabled value=''></option>
          {
            filteredCities?.length && filteredCities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)
          }
        </SelectFormItem>
        <SelectFormItem onChange={handleSelectTemperature} 
          label='Temp Scale:' 
          value={selectedTemperature} 
          disabled={!selectedCity}
          noMargin
          selectStyle={{marginLeft: '0.5em'}}
          alignItems='center'
        >
          <option value='imperial'>Fahrenheint</option>
          <option value='metric'>Celcius</option>
        </SelectFormItem>
      </Row>
      <Row alignItems='center' justify='space-between'>
        <SelectFormItem 
          label='Month:' onChange={handleSelectMonth} 
          value={selectedMonth} noMargin alignItems='center' 
          selectStyle={{marginLeft: '0.5em'}}
        >
            { months.map((month, idx) => <option key={month} value={idx+1}>{month}</option>) }
        </SelectFormItem>
        <SelectFormItem label='Year:' onChange={handleSelectYear} 
          value={selectedYear} noMargin alignItems='center' 
          selectStyle={{marginLeft: '0.5em'}}
        >
            { yearsOptions.length && yearsOptions.map(year => <option key={year} value={year}>{year}</option>) }
        </SelectFormItem>
      </Row>
      <div className='calendar-container'>
        <CalendarHeaderContainer className='calendar-header'>
          {
            weekDaysName.map(weekDay => <CalendarHeaderTitle key={weekDay}>{weekDay}</CalendarHeaderTitle>)
          }
        </CalendarHeaderContainer>
        <CalendarBodyContainer className='calendar-body'>
          {
            monthDaysToSkip.map((daysToSkip, idx) => {
              const lastMonth = dayjs(dayToRenderCalendar).month() === 0 ? 12 : dayjs(dayToRenderCalendar).month();
              const year = lastMonth === 12 ? selectedYear - 1 : selectedYear;
              const lastMonthDay = dayjs(`${lastMonth}-1-${year}`).daysInMonth();
              const dateToCheck = dayjs(`${lastMonth}-${lastMonthDay + idx + 1 - monthDaysToSkip.length}-${year}`);
              
              return (
                <DayContainer disabled weekEnd={checkWeekEnd(dateToCheck)} key={`skip-${idx}`} key={`start-complete-${idx}`}>
                  <CalendarDate disabled weekEnd={checkWeekEnd(dateToCheck)}>
                    {lastMonthDay + idx + 1 - monthDaysToSkip.length}
                  </CalendarDate>
                </DayContainer>
              )
            })
          }
          {
            monthDays.map((monthDay, idx) => {
              const dateToCheck = dayjs(`${dayjs(dayToRenderCalendar).month() + 1}-${idx+1}-${selectedYear}`);
              
              return (
                <DayContainer 
                  key={`month-days-${idx+1}`} 
                  onClick={() => setSelectedDay(idx+1)}
                  selected={selectedDay === idx+1}
                  weekEnd={checkWeekEnd(dateToCheck)}
                >
                  {
                    selectedCity && weather?.temp && idx+1 === today.date() && +selectedMonth === (today.month() + 1) ?
                    <CalendarWeather>
                      <FontAwesomeIcon icon={
                          weather.main === 'Clouds' ? faCloudSun
                          : weather.main === 'Clear' ? faSun 
                          : weather.main === 'Snow' ? faSnowflake
                          : weather.main === 'Rain' ? faCloudRain
                          : faCloudSun
                        }
                      />
                      <span style={{marginLeft: '0.5em'}}>{`${weather.temp}º ${selectedTemperature === 'metric' ? 'C' : 'F'}`}</span>
                    </CalendarWeather>
                    : null

                  }
                  <CalendarDate weekEnd={checkWeekEnd(dateToCheck)}>
                    {idx+ 1}
                  </CalendarDate>
                  <RemindersContainer>
                    {
                      reminders?.[selectedYear]?.[selectedMonth]?.[idx+1] 
                        ? reminders?.[selectedYear]?.[selectedMonth]?.[idx+1].map((reminder, i) => {
                          const remainingReminders = reminders?.[selectedYear]?.[selectedMonth]?.[idx+1].length - 1;

                          return i < 1 ?
                            <Reminder key={`reminder-${idx+1}-${i}`}>{`${reminder.time} - ${reminder.title}`}</Reminder>
                            : i === 1 
                            ? <Reminder key={`reminder-${idx+1}-${i}`}>
                              {`+${remainingReminders} ${remainingReminders === 1 ? 'lembrete' : 'lembretes'}...`}
                            </Reminder> : null
                        })
                        : null
                    }
                  </RemindersContainer>
                </DayContainer>
              )
            }
            )
          }
          {
            monthDaysToComplete?.length 
              ? monthDaysToComplete.map((dayToComplete, idx) => {
                const dateToCheck = selectedMonth === 'December'
                  ? dayjs(`${dayjs.month(dayToRenderCalendar) + 1}-${idx+1}-${selectedYear + 1}`)
                  : dayjs(`${dayjs(dayToRenderCalendar).month() + 2}-${idx+1}-${selectedYear}`);
                
                return (
                  <DayContainer disabled weekEnd={checkWeekEnd(dateToCheck)} key={`complete-${idx}`}>
                    <CalendarDate disabled weekEnd={checkWeekEnd(dateToCheck)}> {idx + 1} </CalendarDate>
                  </DayContainer>
                )})
              : null
          }
        </CalendarBodyContainer>
      </div>
    </div>
  )
}

export default Calendar;