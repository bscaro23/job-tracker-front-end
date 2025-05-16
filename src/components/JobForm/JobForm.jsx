// src/components/JobForm/JobForm.jsx

import { useState } from 'react';

const JobForm = ({ handleAddJob }) => {
  const [formData, setFormData] = useState({
    title: '',
    salary: '',
    type: 'Full-time',
    applicationDeadline: '',
    postedBefore: false,
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddJob(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title-input'>Job Title:</label>
      <input
        required
        type='text'
        name='title'
        id='title-input'
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor='salary-input'>Salary:</label>
      <input
        type='text'
        name='salary'
        id='salary-input'
        value={formData.salary}
        onChange={handleChange}
      />

      <label htmlFor='type-select'>Job Type:</label>
      <select
        name='type'
        id='type-select'
        value={formData.type}
        onChange={handleChange}
      >
        <option value='Full-time'>Full-time</option>
        <option value='Part-time'>Part-time</option>
        <option value='Contract'>Contract</option>
        <option value='Internship'>Internship</option>
        <option value='Temporary'>Temporary</option>
      </select>

      <label htmlFor='deadline-input'>Application Deadline:</label>
      <input
        type='date'
        name='applicationDeadline'
        id='deadline-input'
        value={formData.applicationDeadline}
        onChange={handleChange}
      />

      <label htmlFor='postedBefore-input'>
        <input
          type='checkbox'
          name='postedBefore'
          id='postedBefore-input'
          checked={formData.postedBefore}
          onChange={handleChange}
        />
        Previously Posted?
      </label>

      <button type='submit'>Submit Job</button>
    </form>
  );
};

export default JobForm;
