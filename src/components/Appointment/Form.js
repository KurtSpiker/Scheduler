import Button from "components/Button"
import InterviewerList from "components/InterviewerList"
import React, { useState } from 'react';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")
  
  const reset = () => {
    setStudent(() => "")
    setInterviewer(() => null)
  }
  const cancel = () => {
    reset()
    props.onCancel()
  }

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank")
      return
    }
    if (interviewer === null) {
      setError("Please select an interviewer")
      return
    }
    setError("")
    props.onSave(student, interviewer)
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
            
          />
          <section className="appointment_validation">{error}</section>
        </form>
        <InterviewerList
          onChange={setInterviewer}
          interviewers={props.interviewers}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}