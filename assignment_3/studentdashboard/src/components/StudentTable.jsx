import React from 'react';
import StudentRow from './StudentRow';

function StudentTable({ students, onUpdateScore }) {
  return (
    <div className="table-box">
      <div className="box-header">
        <p>STUDENT RECORDS</p>
        <small>{students.length} entries</small>
      </div>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>SCORE</th>
            <th>STATUS</th>
            <th>UPDATE</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow 
              key={student.id} 
              student={student} 
              onUpdateScore={onUpdateScore} 
            />
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
