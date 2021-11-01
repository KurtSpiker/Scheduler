export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = []
  
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
      eachDay.appointments.map((appointmentID) => {
        return appointmentsForDay.push(state.appointments[appointmentID])
      })
    }
  }
  return appointmentsForDay
}

export function getInterviewersForDay(state, day) {
  const interviewersForDay = []
  
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
      eachDay.interviewers.map((interviewerID) => {
        return interviewersForDay.push(state.interviewers[interviewerID])
      })
    }
  }
  return interviewersForDay;
}

export function getInterview(state, interview) {

  const interviewInfo = {}
  if (interview) {
    interviewInfo.student = interview.student
    interviewInfo.interviewer = state.interviewers[interview.interviewer]
    return interviewInfo
  }
  return null
}