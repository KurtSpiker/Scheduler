import React from "react";
import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData()

  let dailyAppointments = getAppointmentsForDay(state, state.day)
  let dailyInterviewers = getInterviewersForDay(state, state.day)
  console.log(dailyInterviewers)
  const appointmentInfo = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}

      />
    )
  })

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
        {appointmentInfo}
        <Appointment key="last" time="5" />
      </section>
    </main>
  );
}
