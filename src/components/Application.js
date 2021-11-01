import React from "react";
import { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import axios from 'axios'
import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((res) => {
      setState((prev) => {
        return {...prev, days: res[0].data, appointments: res[1].data}
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5" />
      </section>
    </main>
  );
}
