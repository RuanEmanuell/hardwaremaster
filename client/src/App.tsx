import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import ManualBuild from './pages/manualbuild/manualbuild';
import List from './pages/list/list';
import Login from './pages/login/login';
import CreateAccount from './pages/login/create';
import CreateNewPassword from './pages/login/newpassword'
import ResetPassword from './pages/login/resetpassword';
import { AuthProvider } from './utils/auth';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/manualbuild' Component={ManualBuild}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/login/createaccount' Component={CreateAccount}></Route>
          <Route path='/login/resetpassword' Component={ResetPassword}></Route>
          <Route path='/login/createnewpassword/' Component={CreateNewPassword}></Route>
          <Route path='/list' Component={List}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;