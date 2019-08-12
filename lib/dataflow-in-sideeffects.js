import React, { useState, useEffect, useMemo } from 'react';

/** 
 * Don’t Stop the Data Flow in Side Effects
 * 
 * Whenever you use props and state, consider what should happen if they change. In most cases, a component shouldn’t treat the initial render and updates differently. That makes it resilient to changes in the logic.
 * 
 * With classes, it’s easy to forget about updates when using props and state inside the lifecycle methods. Hooks nudge you to do the right thing — but it takes some mental adjustment if you’re not used to already doing it.
 * 
 * Props and state are a part of the React data flow. Both rendering and side effects should reflect changes in that data flow, not ignore them!
 * 
 * To fix our code, we can:

 * Look at componentDidMount and every method called from it.
       In our example, that’s fetchResults and getFetchUrl
 *

 * Write down all props and state used by those methods.
       In our example, that’s this.props.query and this.state.currentPage.
 *

 * Make sure that whenever those props change, we re-run the side effect.
       We can do this by changing the componentDidUpdate method.
 *

 * Below are some correct ways to write a component to handle updates to the currentPage state:
 *
 */
class SearchResults extends React.Component {
  state = {
    data: null,
    currentPage: 0
  };
  componentDidMount() {
    this.fetchResults();
  }
  componentDidUpdate(prevProps, prevState) {
    // ✅ Refetch on change
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevProps.query !== this.props.query
    ) {
      this.fetchResults();
    }
  }
  fetchResults() {
    const url = this.getFetchUrl();
    // Do the fetching...
  }
  getFetchUrl() {
    return (
      'http://myapi/results?query' +
      this.props.query +
      '&page=' +
      this.state.currentPage // ✅ Updates are handled
    );
  }
  render() {
    // Return some DOM here.
    return {};
  }
}

/**
 * useEffect
 * 
 * We put the logic inside of the effect, and that makes it easier to see which values from the React data flow it depends on. These values are called “dependencies”, and in our example they are [currentPage, query].

 * Note how this array of “effect dependencies” isn’t really a new concept. In a class, we had to search for these “dependencies” through all the method calls. The useEffect API just makes the same concept explicit.
 *
 */
function SearchResultPage({ query }) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    function fetchResults() {
      const url = getFetchUrl();
      // Do the fetching...
    }

    function getFetchUrl() {
      return 'http://myapi/results?query' + query + '&page=' + currentPage;
    }

    fetchResults();
  }, [currentPage, query]); // ✅ Refetch on change
  // ...
}

/**
    Functions are different on every render so you discover this problem right away.
    With useCallback and useContext, you can avoid passing functions deep down altogether. This lets you optimize rendering without worrying about functions.
 */

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
