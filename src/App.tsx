import './App.css';
import React from 'react';
import Main from './components/main/Main.tsx';
import { Route, Routes } from 'react-router';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default App;
