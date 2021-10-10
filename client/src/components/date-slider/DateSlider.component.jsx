import React from 'react';
import Button from '@mui/material/Button';
import moment from 'moment';

import './DateSlider.styles.css';

const DateSlider = ({ dateSlidesToShow, currentDate }) => {
  const [datesObj, setDatesObj] = React.useState({
    selectedDate: currentDate,
    activeDate: currentDate,
    visibleDates: [],
  });

  const loadDates = (activeDate) => {
    let midVal = Math.ceil(dateSlidesToShow / 2);
    let startDate = moment(activeDate).subtract(midVal, 'days');

    let datesToShow = [];

    for (let i = 0; i < dateSlidesToShow; i++) {
      let dateVal =
        i === 0 ? moment(startDate) : moment(startDate).add(1, 'day');
      startDate = dateVal;
      datesToShow.push({
        dateVal,
        isActive: false,
        isCurrent: moment(dateVal).isSame(moment(), 'day'),
      });
    }

    console.log('datesToShow', datesToShow, 'activeDate', activeDate);

    return datesToShow.map((el) => (
      <div
        className={`cm-date-slide-item${
          el.isActive ? ' cm-date-slide-active' : ''
        }${el.isCurrent ? ' cm-date-slide-current' : ''}`}
        key={moment(el.dateVal).toISOString()}
      >
        <h4>{moment(el.dateVal).format('MMM')}</h4>
        <h2>{moment(el.dateVal).format('DD')}</h2>
        <p>{moment(el.dateVal).format('ddd')}</p>
        <span>{moment(el.dateVal).format('YYYY')}</span>
      </div>
    ));
  };

  const handlePrev = () => {
    setDatesObj({
      ...datesObj,
      selectedDate: moment(datesObj.selectedDate).subtract(
        dateSlidesToShow,
        'days'
      ),
    });
  };

  const handleNext = () => {
    setDatesObj({
      ...datesObj,
      selectedDate: moment(datesObj.selectedDate).add(dateSlidesToShow, 'days'),
    });
  };

  return (
    <div className="cm-date-slider-container cm-flex-type-1">
      <Button variant="contained" onClick={handlePrev}>
        Previous
      </Button>
      {loadDates(datesObj.selectedDate)}
      <Button variant="contained" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

DateSlider.defaultProps = {
  dateSlidesToShow: 10,
  currentDate: new Date(),
};

export default DateSlider;
