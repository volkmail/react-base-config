import React, { useState } from "react";

type Props = {
  // eslint-disable-next-line react/require-default-props
  value?: number;
};

const App: React.FC<Props> = ({ value = 0 }) => {
  const [counter, setCounter] = useState(value);

  const onMinus = () => {
    setCounter((prev) => prev - 1);
  };

  const onPlus = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button type="button" onClick={onMinus}>
        AddOne
      </button>
      <button type="button" onClick={onPlus}>
        RemoveOne
      </button>
    </div>
  );
};

export default App;
