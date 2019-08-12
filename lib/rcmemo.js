import React from 'react';
// Both examples are acceptable when writing a reusable component.

// These ensure that the data flow isn't ignored.
// These ensure that the updates aren't ignored.
// These also ensure that values used aren't stale.
// This ensures that passing a different function as a prop will always work.

function Button({ color, children }) {
  // ✅ Don’t recalculate until `color` changes
  const textColor = useMemo(() => slowlyCalculateTextColor(color), [color]);
  return (
    <button className={'Button-' + color + ' Button-text-' + textColor}>
      {children}
    </button>
  );
}

function ButtonTwo({ onClick, color, children }) {
  const textColor = slowlyCalculateTextColor(this.props.color);
  return (
    <button
      onClick={onClick}
      className={'Button-' + color + ' Button-text-' + textColor}
    >
      {children}
    </button>
  );
}

export default React.memo(Button);

// If you insist on a custom comparison, make sure that you don’t skip functions:
class rcmemo extends React.Component {
  shouldComponentUpdate(prevProps) {
    // ✅ Compares this.props.onClick
    return (
      this.props.color !== prevProps.color ||
      this.props.onClick !== prevProps.onClick
    );
  }
  render() {
    return <div></div>;
  }
}


