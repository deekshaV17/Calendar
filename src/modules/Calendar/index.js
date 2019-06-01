import React from "react";
import moment from "moment";

import Modal from '../Modal';

import "./calendar.css";

class Calendar extends React.Component {

  weekdayshort = moment.weekdaysShort();

  state = {
    dateObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
    show: false,
    events: [{
      id: 1,
      text: "Event 1",
      day: moment(),
      backColor: "#cc0000"
    },{
        id: 2,
        text: "Event 2",
        day: moment().add(1, 'day'),
        backColor: "#cc0000"
    }],
  };

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };

  year = () => {
    return this.state.dateObject.format("Y");
  };

  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d");
    return firstDay;
  };

  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
    });
  };

  onPrev = () => {
    this.setState({
      dateObject: this.state.dateObject.subtract(1, "month")
    });
  };

  onNext = () => {
    this.setState({
      dateObject: this.state.dateObject.add(1, "month")
    });
  };

  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }

  onDayClick = (e, d) => {
    this.setState(
      {
        selectedDay: d,
        show: true,
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
      }
    );
  };

  close = () => {
    this.setState({ show: false });
  };

  addEvent = (desc) => {
    const { selectedDay } = this.state;
    const newDate = moment(selectedDay.toString().concat(this.month()).concat(this.year()));
    const event = {
      id: selectedDay,
      text: desc,
      day: newDate,
      backColor: '#444',
    }
    this.setState((prevState) => ({ show: false, events: [...prevState.events, event] }));
  }

  getEvents = (date) => {
    const newDate = moment(date.toString().concat(this.month()).concat(this.year()));
    const { events } = this.state;
    const dayEvents = events.filter((event) => 
      event.day.isSame(newDate, 'date')
    );

    return dayEvents.map((event) => (
      <div className="event-wrapper">
        <div className="event" style={{ backgroundColor: event.backColor }}>
        {event.text}
        </div>
      </div>
    ));
  }

  render() {
    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d === this.currentDay() ? "today" : "";
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`} onClick={e => {
          this.onDayClick(e, d);
        }}>
          <span>
            {d}
          </span>
          <span>{this.getEvents(d)}</span>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    const { show } = this.state;

    return (
      <div className="tail-datetime-calendar">
        {show &&
          <Modal close={this.close} addEvent={this.addEvent} />
        }
        <div className="calendar-navi">
          <span
            onClick={e => {
              this.onPrev();
            }}
            className="calendar-button button-prev"
          />
          <span className="calendar-label">
            {this.month()}
          </span>
          <span className="calendar-label">
            {this.year()}
          </span>
          <span
            onClick={e => {
              this.onNext();
            }}
            className="calendar-button button-next"
          />
        </div>

        <div className="calendar-date">
          <table className="calendar-day">
            <thead>
              <tr>{weekdayshortname}</tr>
            </thead>
            <tbody>{daysinmonth}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Calendar;
