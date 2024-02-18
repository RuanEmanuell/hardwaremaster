import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import ManualBuild from './pages/manualbuild/manualbuild';
import List from './pages/list/list';

const App : React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/manualbuild' Component={ManualBuild}></Route>
        <Route path='/list' Component={List}></Route>
      </Routes>
    </Router>
  )
}

export default App;