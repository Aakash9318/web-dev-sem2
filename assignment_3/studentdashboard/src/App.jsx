import React, { useState } from 'react';
import Header from './components/Header';
import AddStudentForm from './components/AddStudentForm';
import Stats from './components/Stats';
import StudentTable from './components/StudentTable';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Aman', score: 78 },
    { id: 2, name: 'Riya', score: 45 },
    { id: 3, name: 'Karan', score: 90 },
    { id: 4, name: 'Neha', score: 32 }
  ]);

  const addStudent = (name, score) => {
    setStudents([...students, { id: Date.now(), name, score }]);
  };

  const updateScore = (id, newScore) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, score: newScore } : student
    ));
  };

  return (
    <div className="app-wrapper">
      <Header />
      <AddStudentForm onAddStudent={addStudent} />
      <Stats students={students} />
      <StudentTable students={students} onUpdateScore={updateScore} />
      <div className="footer-text">ACADEMIC TERMINAL - SECURE SESSION</div>
    </div>
  );
}

export default App;
