import React from "react";

import "./styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";


export default function Appointment(props) {
  function appointmentText() {
    if (props.time) {
      return "Appointment at " + props.time;
    }
    return "no Appointments"
  }
  return(
    <article className="appointment">{appointmentText}
      <Header time={props.time}></Header>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
  )
}