import React, { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || score === '') return;
    onAddStudent(name, parseInt(score, 10));
    setName('');
    setScore('');
  };

  return (
    <div className="add-student-box">
      <div className="box-header">
        <p><span></span> REGISTER STUDENT</p>
        <small>NEW ENTRY</small>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Score (0-100)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          min="0"
          max="100"
          required
        />
        <button type="submit">+ ADD</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
