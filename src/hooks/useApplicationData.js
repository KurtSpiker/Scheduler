import {useState, useEffect} from "react"
import axios from "axios"

export default function useApplicationData() {

  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ])
    .then((res) => {
      setState((prev) => {
        return {...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])

  //Hooks for canceling, and booking an interview. Containg the correct calls and state updates

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        const days = availiabilityUpdate(state, false, id)
        setState({
          ...state,
          appointments,
          days
        });
      })
  }
  
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`, {interview})
      .then((res) => {
        const days = availiabilityUpdate(state, true, id)
        setState({
          ...state,
          appointments,
          days
        });
      })
  }
  //A hook used for determining, and updating the amount of spots for a given day
  function availiabilityUpdate(state, cancelInterview, id) {
    const { day, days, appointments } = state;
    const currentDay = days.find((desiredDay) => desiredDay.name === day);
    let spots = 0;

    for (let id of currentDay.appointments) {
      if (appointments[id].interview === null) {
        spots++;
      }
    }

    if (cancelInterview) {
      spots++
    } else if (!cancelInterview && appointments[id].interview === null) {
      spots --;
    } 
    
    const newDay = {...currentDay, spots};
    const newDays = days.map(d => d.name === day ? newDay : d)

    return newDays;
  }
  return {state, setDay, bookInterview, cancelInterview }
}