// src/App.jsx

import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router'; // Import React Router


import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SchoolList from './components/SchoolList/SchoolList';

import { UserContext } from './contexts/UserContext';
import * as schoolService from './services/schoolServices'

const App = () => {

  const { user } = useContext(UserContext);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchAllSchools = async () => {
      const schoolsData = await schoolService.index();
  
      setSchools(schoolsData)
    };
    if (user) fetchAllSchools();
  }, [user]);
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/schools' element={<SchoolList schools={schools} />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;

