import React from 'react';
import { useRecord } from '../hooks/useRecord';
import styles from './App.css';

const useRecord = (init) => {
  const [before, setBefore] = useState([]);
  const [current, setCurrent] = useState(init);
  const [after, setAfter] = useState([]);

  const undo = () => {
    setAfter(after => [current, ...after]);
    setCurrent(before[before.length - 1]);
    setBefore(before => before.slice(0, -1));
  };

  const redo = () => {
    setBefore(before => [...before, current]);
    setCurrent(after[0]);
    setAfter(after => after.slice(1));
  }

  const record = val => {
    setBefore(before => [...before, current]);
    setCurrent(val);
  }

  return {
    undo,
    record,
    redo,
    current,
  }
};

function App() {
  const { current, undo, redo, record } = useRecord('#FF0000');

  return (
    <>
      <button aria-label="undo-button" onClick={undo}>undo</button>
      <button aria-label="redo-button" onClick={redo}>redo</button>
      <input aria-label="color-picker" type="color" value={current} onChange={({ target }) => record(target.value)} />
      <div aria-label="display" style={{ backgroundColor: current, width: '10rem', height: '10rem' }}></div>
    </>
  )
}

export default App;