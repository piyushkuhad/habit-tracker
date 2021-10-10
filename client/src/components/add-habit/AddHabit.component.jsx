import React from 'react';
import moment from 'moment';

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import './AddHabit.styles.css';

const daysName = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const initialFormVal = {
  habitName: '',
  habitType: 'to-do',
  habitBegin: moment().toDate(),
  habitTime: moment().add(1, 'day').toDate(),
  habitEndType: 'infinite',
  habitEnd: moment().toDate(),
  habitTrack: null,
  habitColor: '#000',
  habitFrequencyLabel: 'everyday',
  habitCustomFrequency: [],
};

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function AddHabit(props) {
  const [formVal, setFormVal] = React.useState(initialFormVal);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Values', formVal);

    if (
      formVal.habitName === '' ||
      moment(formVal.habitBegin).isAfter(formVal.habitEnd)
    ) {
      alert('Fix errors');
    }
  };

  const onFieldChange = (e) => {
    setFormVal({
      ...formVal,
      [e.target.name]: e.target.value,
    });
  };

  const onDateChange = (fieldName, value) => {
    setFormVal({
      ...formVal,
      [fieldName]: value.toDate(),
    });
  };

  const loadCustomDays = () =>
    daysName.map((el) => (
      <ListItem className="cm-custom-day-chip" key={el}>
        <Chip
          label={el}
          onClick={(e) => handleCustomFreq(el)}
          className={`${
            formVal.habitCustomFrequency.includes(el) ? 'cm-active-chip' : ''
          }`}
        />
      </ListItem>
    ));

  const handleCustomFreq = (dayName) => {
    console.log('dayName', dayName, formVal.handleCustomFreq);

    let isAdded = formVal.habitCustomFrequency.includes(dayName);

    if (!isAdded) {
      setFormVal({
        ...formVal,
        habitCustomFrequency: [...formVal.habitCustomFrequency, dayName],
      });
    } else {
      let customFreqDaysArr = formVal.habitCustomFrequency.filter(
        (el) => el !== dayName
      );
      setFormVal({
        ...formVal,
        habitCustomFrequency: customFreqDaysArr,
      });
    }
  };

  return (
    <div>
      <h1>Add Habit</h1>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="cm-form-field">
          <TextField
            required
            id="habit-name"
            label="Habit Name"
            name="habitName"
            value={formVal.habitName}
            onChange={(e) => onFieldChange(e)}
          />
        </div>

        <FormControl component="fieldset">
          <FormLabel component="legend">Habit Type</FormLabel>
          <RadioGroup
            row
            aria-label="type"
            name="habitType"
            value={formVal.habitType}
            onChange={(e) => onFieldChange(e)}
          >
            <FormControlLabel value="to-do" control={<Radio />} label="To-Do" />
            <FormControlLabel
              value="not-to-do"
              control={<Radio />}
              label="Avoid"
            />
          </RadioGroup>
        </FormControl>

        <div className="cm-form-field">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              renderInput={(props) => <TextField {...props} />}
              label="Track Habit From"
              inputFormat="DD/MM/YYYY"
              value={moment(formVal.habitBegin)}
              name="habitBegin"
              onChange={(value) => onDateChange('habitBegin', value)}
            />
          </LocalizationProvider>
        </div>

        <div className="cm-form-field">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Select Habit Time"
              value={formVal.habitTime}
              name="habitTime"
              onChange={(value) => onDateChange('habitTime', value)}
            />
          </LocalizationProvider>
        </div>

        <div className="cm-form-field">
          <FormControl>
            <InputLabel id="track-habit-until-label">
              Track Habit Until
            </InputLabel>
            <Select
              labelId="track-habit-until-label"
              id="track-habit-until"
              value={formVal.habitEndType}
              label="Track Habit Until"
              name="habitEndType"
              onChange={onFieldChange}
            >
              <MenuItem value="infinite">The End of World!</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>
        </div>

        {formVal.habitEndType === 'custom' && (
          <div className="cm-form-field">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                renderInput={(props) => <TextField {...props} />}
                label=""
                inputFormat="DD/MM/YYYY"
                minDate={moment(formVal.habitBegin)}
                value={moment(formVal.habitEnd)}
                name="habitEnd"
                onChange={(value) => {
                  console.log('End', value);
                  onDateChange('habitEnd', value);
                }}
              />
            </LocalizationProvider>
          </div>
        )}

        <div className="cm-form-field">
          <label>Select Color</label>
          <input
            type="color"
            value={formVal.habitColor}
            onChange={(e) => onFieldChange(e)}
            name="habitColor"
          />
        </div>

        <FormControl component="fieldset">
          <FormLabel component="legend">Habit Frequency</FormLabel>
          <RadioGroup
            row
            aria-label="type"
            name="habitFrequencyLabel"
            value={formVal.habitFrequencyLabel}
            onChange={(e) => onFieldChange(e)}
          >
            <FormControlLabel
              value="everyday"
              control={<Radio />}
              label="Everyday"
            />
            <FormControlLabel
              value="weekdays"
              control={<Radio />}
              label="Weekdays"
            />
            <FormControlLabel
              value="weekends"
              control={<Radio />}
              label="Weekends"
            />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Custom"
            />
          </RadioGroup>
        </FormControl>

        {formVal.habitFrequencyLabel === 'custom' && (
          <div className="cm-form-field">
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component="ul"
              elevation={0}
            >
              {loadCustomDays()}
            </Paper>
          </div>
        )}

        <div className="cm-form-field">
          <Button onClick={handleFormSubmit} variant="contained">
            Add Habit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddHabit;
