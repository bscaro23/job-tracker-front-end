// src/App.jsx

import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router'; // Import React Router


import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SchoolList from './components/SchoolList/SchoolList';
import SchoolDetails from './components/SchoolDetails/SchoolDetails';
import SchoolForm from './components/SchoolForm/SchoolForm';

import { UserContext } from './contexts/UserContext';
import * as schoolService from './services/schoolServices'

const App = () => {

  const { user } = useContext(UserContext);
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSchools = async () => {
      const schoolsData = await schoolService.index();
  
      setSchools(schoolsData)
    };
    if (user) fetchAllSchools();
  }, [user]);


  const handleAddSchool = async (schoolFormData) => {
    const newSchool = await schoolService.create(schoolFormData);
    setSchools([newSchool, ...schools]);
    navigate('/schools');
  };

  const handleDeleteSchool = async (schoolId) => {
    const deletedSchool = await schoolService.deleteSchool(schoolId);
    setSchools(schools.filter((school) => school._id !== deletedSchool._id));
    navigate('/schools');
  };

  const handleUpdateSchool = async (schoolId, schoolFormData) => {
    const updatedSchool = await schoolService.update(schoolId, schoolFormData);
    setSchools(schools.map((school) => (schoolId === school._id ? updatedSchool : school)));
    navigate(`/schools/${schoolId}`);
  };
  


  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/schools' element={<SchoolList schools={schools} />} />
            <Route path='/schools/:schoolId' element={ <SchoolDetails handleDeleteSchool={handleDeleteSchool}/> }/>
            <Route path='/schools/new' element={ <SchoolForm handleAddSchool={handleAddSchool} /> } />
            <Route path='/schools/:schoolId/edit' element={<SchoolForm handleUpdateSchool={handleUpdateSchool} />} />
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

//Todo add the job CRUD functionality next on back end and front end

