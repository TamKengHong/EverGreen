import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Link to='/login'>Login</Link> |{" "}
      <Link to='/signup'>Signup</Link>
    </>
  );
}

export default App;
