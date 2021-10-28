import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewListItem(props) {
  const InterviewClass = classNames ("interviewers__item", {
    "interviewers__item--selected": props.selected
  })
  const selectedName = (selected) => {
    if(!selected) {
      return "";
    }
    return props.name
  }
  return(
    <li className={InterviewClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
      />
      {selectedName(props.selected)}
    </li>
  )
}
