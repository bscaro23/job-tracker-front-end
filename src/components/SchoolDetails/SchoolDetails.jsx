// src/components/HootDetails/HootDetails.jsx

import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as schoolService from '../../services/schoolServices';

import JobForm from '../JobForm/JobForm';
import { UserContext } from '../../contexts/UserContext';


const SchoolDetails = ({handleDeleteSchool}) => {
    const { schoolId } = useParams();
    const { user } = useContext(UserContext);
    const [school, setSchool] = useState(null);
  

    useEffect(() => {
        const fetchSchool = async () => {
          const schoolData = await schoolService.show(schoolId);
          setSchool(schoolData);
        };
        fetchSchool();
      }, [schoolId]);

      if (!school) return <main>Loading...</main>;
    
      const handleAddJob = async (jobFormData) => {
      
        const newJob = await schoolService.createJob(schoolId, jobFormData);
        
        setSchool({ ...school, currentJobs: [...school.currentJobs, newJob._id] });
      };

      return (
        <div className="school-details">
          <h1>School Details</h1>
    
          <h2>{school.name}</h2>
          <p><strong>Location:</strong> {school.location}</p>
          <p><strong>Age Range:</strong> {school.ageRange}</p>
          <p><strong>Category:</strong> {school.category}</p>
    
          <h3>Author:</h3>
          <p>{school.author?.name || 'Unknown'}</p>
    
          <h3>Current Jobs:</h3>
          <JobForm handleAddJob={handleAddJob}/>
          {school.currentJobs ? (
            <ul>
              <li>{school.currentJobs.title} - {school.currentJobs.department}</li>
            </ul>
          ) : (
            <p>No current job listings.</p>
          )}
    
          <h3>Past Jobs:</h3>
          {school.pastJobs ? (
            <ul>
              <li>{school.pastJobs.title} - {school.pastJobs.department}</li>
            </ul>
          ) : (
            <p>No past job listings.</p>
          )}

          {school.author._id === user._id && (
            <>
              <Link to={`/schools/${schoolId}/edit`}>Edit</Link>
              <button onClick={() => handleDeleteSchool(schoolId)}>
                Delete
              </button>
            </>
          )}
    
          <footer>
            <Link to="/">Back to Home</Link>
          </footer>
        </div>
      );
  };
  
  export default SchoolDetails;
  