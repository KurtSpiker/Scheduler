import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const scheduleSpecifics = props.days.map(dayItems => {
    return (
      <DayListItem
        key={dayItems.id}
        name={dayItems.name}
        spots={dayItems.spots}
        selected={dayItems.name === props.value}
        setDay={props.onChange}
      />
    )
  })
  return (
    <ul>{scheduleSpecifics}</ul>
  )
}