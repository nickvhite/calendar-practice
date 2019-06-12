import React, {Component} from 'react';
import dateFns from "date-fns";

class CalendarMonth extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.props;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`day-container ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <div className="day-number">
                            <span>{formattedDate}</span>
                        </div>
                    </div>
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
        return <div className="calendar-month-container">{rows}</div>;
    }

    render() {
        return this.renderCells()
    }
}

export default CalendarMonth;