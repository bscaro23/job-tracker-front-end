const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/schools`;


// src/services/schoolService.js

  const index = async () => {
      try {
        const res = await fetch(BASE_URL, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
    };

  const show = async (schoolId) => {
  try {
      const res = await fetch(`${BASE_URL}/${schoolId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
  } catch (error) {
      console.log(error);
  }
  };

  const create = async (schoolFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const createJob = async (schoolId, jobFormData) => {
    try {
      console.log(jobFormData)
      const res = await fetch(`${BASE_URL}/${schoolId}/jobs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteSchool = async (schoolId) => {
    try {
      const res = await fetch(`${BASE_URL}/${schoolId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  async function update(schoolId, schoolFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${schoolId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  export { 
    index,
    show,
    create,
    createJob,
    deleteSchool,
    update,
  };