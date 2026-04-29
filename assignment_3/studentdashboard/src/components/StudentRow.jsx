import React, { useState, useEffect } from 'react';

function StudentRow({ student, onUpdateScore }) {
  const [editScore, setEditScore] = useState(student.score);

  useEffect(() => {
    setEditScore(student.score);
  }, [student.score]);

  const handleSave = () => {
    if (editScore !== '' && !isNaN(editScore)) {
      onUpdateScore(student.id, parseInt(editScore, 10));
    }
  };

  const isPass = student.score >= 40;

  return (
    <tr className={isPass ? 'pass-row' : 'fail-row'}>
      <td style={{ color: '#e2e8f0' }}>{student.name}</td>
      <td style={{ color: '#fbbf24', fontSize: '1.1rem', fontWeight: 'bold' }}>{student.score}</td>
      <td>
        <div className={`badge ${isPass ? 'pass-badge' : 'fail-badge'}`}>
          <span></span> {isPass ? 'PASS' : 'FAIL'}
        </div>
      </td>
      <td className="action-cell">
        <input
          type="number"
          value={editScore}
          onChange={(e) => setEditScore(e.target.value)}
          min="0"
          max="100"
        />
        <button onClick={handleSave}>SAVE</button>
      </td>
    </tr>
  );
}

export default StudentRow;
