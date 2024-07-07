import React, { useState } from 'react';
import './duedate.css';

const DueDate = ({ isVisible, onClose, onSave }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());
  const [step, setStep] = useState(0);


  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleYearSelect = (selectedYear) => {
    setYear(selectedYear);
    setStep(1);
  };

  const handleMonthSelect = (selectedMonth) => {
    setMonth(selectedMonth);
    setStep(2);
  };

  const handleDaySelect = (selectedDay) => {
    setDay(selectedDay);
  };

  if (!isVisible) return null;

  return (
    <div className="date-picker">
      <div className="header">
        <button onClick={handlePrev} disabled={step === 0}>{"<"}</button>
        <span>{year}</span>
        <button onClick={handleNext} disabled={step === 2}>{">"}</button>
      </div>
      {step === 0 && <YearPicker selectedYear={year} onSelect={handleYearSelect} />}
      {step === 1 && <MonthPicker selectedMonth={month} onSelect={handleMonthSelect} months={months} />}
      {step === 2 && <DayPicker selectedDay={day} onSelect={handleDaySelect} year={year} month={month} />}
      <div className="footer">
        <label>Selected Date: {`${year}-${months[month]}-${day}`}</label>

        <div className="btn-box">
          <div className='submit' onClick={()=>{onSave(`${year}-${months[month]}-${day}`)}}>Save</div>
          <div className='cancel' onClick={onClose}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

const YearPicker = ({ selectedYear, onSelect }) => {
  const years = [];
  for (let i = selectedYear; i <= selectedYear + 15; i++) {
    years.push(i);
  }

  return (
    <div className="year-picker">
      {years.map((year) => (
        <button className={year == selectedYear ? 'd-btn selected-btn' : 'd-btn'} key={year} onClick={() => onSelect(year)}>{year}</button>
      ))}
    </div>
  );
};

const MonthPicker = ({ selectedMonth, onSelect, months }) => {
  return (
    <div className="month-picker">
      {months.map((month, index) => (
        <button className={month === months[selectedMonth] ? 'd-btn selected-btn' : 'd-btn'} key={index} onClick={() => onSelect(index)}>{month}</button>
      ))}
    </div>
  );
};

const DayPicker = ({ selectedDay, onSelect, year, month }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="day-picker">
      {days.map((day) => (
        <button className={day === selectedDay  ? 'day-btn selected-btn' : 'day-btn'} key={day} onClick={() => onSelect(day)}>{day}</button>
      ))}
    </div>
  );
};

export default DueDate;
