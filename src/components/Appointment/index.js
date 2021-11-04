import React from "react";
import useVisualMode from 'hooks/useVisualMode'
import "./styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import { getInterview } from "helpers/selectors";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const getInterviewerName = (interviewerID) => {
    for (let interviewer of props.interviewers) {
      if (interviewerID === interviewer.id) {
        return interviewer.name;
      }
    }
  }

  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => {
        transition(ERROR_SAVE, true)
      })
  }

  function deleteInterview() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE, true)
      })
  }

  return(
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewerName={getInterviewerName(props.interview.interviewer)}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === DELETING && (< Status message="Deleting" />)}
      {mode === SAVING && (< Status message="Saving" />)}
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteInterview}
        /> 
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && (< Error message="Unable to delete appointment." onClose={back} />)}
      {mode === ERROR_SAVE && (< Error message="Unable to save appointment." onClose={back} />)}
    </article>
  )
}