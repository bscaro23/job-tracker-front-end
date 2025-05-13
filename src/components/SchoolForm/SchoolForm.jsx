// src/components/SchoolForm/SchoolForm.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as schoolService from '../../services/schoolServices';

const SchoolForm = ({ handleAddSchool, handleUpdateSchool }) => {

  const { schoolId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    ageRange: 'Primary',
    category: 'State',
  });

  useEffect(() => {
    const fetchSchool = async () => {
      const schoolData = await schoolService.show(schoolId);
      setFormData(schoolData);
    };
    if (schoolId) fetchSchool();
  
    return () => setFormData({ name: '', location: '', ageRange: 'Primary', category: 'State' });
  }, [schoolId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (schoolId) {
      handleUpdateSchool(schoolId, formData);
    } else {
      handleAddSchool(formData);
    }
  };
  

  return (
    <main>
      <form onSubmit={handleSubmit}>
      <h1>{schoolId ? 'School Hoot' : 'New School'}</h1>
        <label htmlFor='name-input'>Name</label>
        <input
          required
          type='text'
          name='name'
          id='name-input'
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor='location-input'>Location</label>
        <input
          required
          type='text'
          name='location'
          id='location-input'
          value={formData.location}
          onChange={handleChange}
        />

        <label htmlFor='ageRange-input'>Age Range</label>
        <select
          required
          name='ageRange'
          id='ageRange-input'
          value={formData.ageRange}
          onChange={handleChange}
        >
          <option value='Primary'>Primary</option>
          <option value='Secondary'>Secondary</option>
          <option value='Through'>Through</option>
          <option value='SEN'>SEN</option>
          <option value='Prep'>Prep</option>
        </select>

        <label htmlFor='category-input'>Category</label>
        <select
          required
          name='category'
          id='category-input'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='State'>State</option>
          <option value='Independent'>Independent</option>
          <option value='Academy'>Academy</option>
        </select>

        <button type='submit'>Submit</button>
      </form>
    </main>
  );
};

export default SchoolForm;
