import React from "react";

import "./styles.scss";


export default function Appointment(props) {
  function appointmentText() {
    if (props.time) {
      return "Appointment at " + props.time;
    }
    return "no Appointments"
  }
  return(
    <article className="appointment">{appointmentText}</article>
  )
}