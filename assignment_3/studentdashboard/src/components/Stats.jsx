import React from 'react';

function Stats({ students }) {
  const total = students.length;
  const passed = students.filter(s => s.score >= 40).length;
  const avg = total > 0 ? Math.round(students.reduce((acc, curr) => acc + curr.score, 0) / total) : 0;

  return (
    <div className="stats">
      <div className="stat-item">
        <p>TOTAL</p>
        <h2>{total}</h2>
      </div>
      <div className="stat-item">
        <p>PASSED</p>
        <h2>{passed}</h2>
      </div>
      <div className="stat-item">
        <p>AVG SCORE</p>
        <h2>{avg}</h2>
      </div>
    </div>
  );
}

export default Stats;
