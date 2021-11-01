import { useState } from 'react';

export default function useVisualMode(modeInit) {
  const [mode, setMode] = useState(modeInit);
  const [history, setHistory] = useState([modeInit]);
  let newHistory = [...history];

  const transition = (modeInit, replace = false) => {
    if(replace) {
      newHistory.splice(-1, 1, modeInit)
    } 

    if (!replace) {
      newHistory.push(modeInit);
    }

    setHistory(newHistory);
    return setMode(newHistory.slice(-1)[0]);
  };

  const back = () => {
    if (newHistory.length > 1) {
      newHistory.pop()
      setHistory(newHistory)
      return setMode(newHistory.slice(-1)[0]);
    }
  };

  return { mode, transition, back }
};
