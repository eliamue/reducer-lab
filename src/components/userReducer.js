import { useEffect, useReducer } from 'react';

export const useRecord = (initialColor = '#541812') => {
  const [current, setCurrent] = useState(initialColor);
  const [history, setHistory] = useState([initialColor]);
  const [index, setIndex] = useState(0);
  const [isDisabled, setDisabled] = useState(false);

  const record = (newColor) => {
    setHistory((prev) => [
      ...prev.slice(0, index + 1),
      newColor,
      ...prev.slice(index + 1),
    ]);

    setCurrent(newColor);
    setDisabled(false);
    console.log(history);
  };

  const undo = () => {
    if (index >= 0) setCurrent(history[index - 1]);
    if (index === 1) setDisabled(true);
  };

  const redo = () => {
    if (index <= history.length)
      setCurrent(history[index + 1]) && setDisabled(false);
    // if (index === history.length) setDisabled(true);
  };

  useEffect(() => {
    setIndex(history.indexOf(current));
  }, [current]);
  //     setHistory((prev) => [...prev, current]);
  //   }, [current]);

  return { undo, redo, current, record, history, index, isDisabled };
};
