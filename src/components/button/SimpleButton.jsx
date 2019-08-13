import React, { useState, useEffect } from 'react';

export default function SimpleButton() {
  const [count, setCount] = useState(0);
  const { className, disabled, text } = useState(0);
  const [hasButtonBeenClicked, setHasButtonBeenClicked] = useState('false');
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <button
      onClick={() => {
        setHasButtonBeenClicked(count > 0);
        setCount(count + 1);
      }}
      className={className}
      disabled={disabled === 'true' || disabled === true}
    >
      {text} {count}
      {hasButtonBeenClicked && <div>Button Clicked!</div>}
    </button>
  );
}
