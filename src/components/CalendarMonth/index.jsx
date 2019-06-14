import React, {Component} from 'react';
import dateFns from "date-fns";

import CalendarDay from '../CalendarDay';

const CalendarMonth = ({ currentMonth, selectedDate, onCalendarClick }) => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, "D");
            days.push(
                <CalendarDay
                    key={day}
                    additionalClass={!dateFns.isSameMonth(day, monthStart)
                        ? "disabled"
                        : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                    }
                    formattedDate={dateFns.format(day, 'M/D/YY')}
                    dayNumber={formattedDate}
                />
            );
            day = dateFns.addDays(day, 1);
        }
        rows.push(
            <div className="week-container" key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className="calendar-month-container" onClick={(e) => onCalendarClick(e)}>{rows}</div>;
};

export default CalendarMonth;