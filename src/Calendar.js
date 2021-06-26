import React, {useState, useEffect} from "react";
import moment from "moment";
import "./Calendar.css";

const Calendar = () => {
    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(moment());

    useEffect(() => {
        const startDate = value.clone().startOf("month").startOf("week");
        const endDate = value.clone().endOf("month").endOf("week");

        const day = startDate.clone().subtract(1, "day");
        const calendarData = [];
        while(day.isBefore(endDate, "day")) {
            calendarData.push(
                Array(7)
                .fill(0)
                .map(() => day.add(1, "day").clone())
            )
        }
        setCalendar(calendarData);
    }, [value]);

    function isSelected(day) 
    {
        return value.isSame(day, "day");
    }

    function beforeToday(day) 
    {
        return moment(day).isBefore(new Date(), "day");
    }

    function isToday(day) 
    {
        return moment(new Date()).isSame(day, "day");
    }

    function dayStyles(day) 
    {
        if (beforeToday(day)) return "before";
        if (isSelected(day)) return "selected";
        if (isToday(day)) return "today";
        return "";
    }

    function currMonthName()
    {
        return value.format("MMMM");
    }

    function currYear()
    {
        return value.format("YYYY");
    }

    function prevMonth()
    {
        return value.clone().subtract(1, "month");
    }

    function nextMonth()
    {
        return value.clone().add(1, "month");
    }

    function thisMonth()
    {
        return value.isSame(new Date(), "month");
    }

    return (
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <div className="calendar">
                <div className="calendar-header">
                    <div className="previous" onClick={() => !thisMonth() && setValue(prevMonth())}>
                        {!thisMonth() ? String.fromCharCode(171) : null}
                    </div>
                    <div className="current">
                        {currMonthName()} {currYear()}
                    </div>
                    <div className="next" onClick={() => setValue(nextMonth())}>
                        {String.fromCharCode(187)}
                    </div>
                </div>
                <div className="calendar-body">
                    <div className="day-names">
                        {["s", "m", "t", "w", "t", "f", "s"].map((dayName) => (
                            <div className="week">
                                {dayName}
                            </div>
                        ))}
                    </div>
                    {
                        calendar.map(week => 
                        <div>
                            {
                                week.map(day => 
                                <div className="day" onClick={() => !beforeToday(day) && setValue(day)}>
                                    <div className={dayStyles(day)}>
                                        {day.format("D").toString()}
                                    </div>
                                </div>)
                            }
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Calendar;
