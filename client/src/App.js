import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import List from './pages/list/list';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/list' Component={List}></Route>
      </Routes>
    </Router>
  )
}

export default App;