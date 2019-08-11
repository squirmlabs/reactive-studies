import React from 'react';
const App = () => {
  const initialBookState = {
    title: '',
    available: false
  };

  const [book, setBook] = useState(initialBookState);

  const updateBook = book => {
    setBook({ title: book.title, available: book.available });
  };
};
