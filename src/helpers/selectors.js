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