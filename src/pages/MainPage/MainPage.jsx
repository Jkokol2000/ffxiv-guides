import React from 'react';
import { Link } from 'react-router-dom';
import '../MainPage/MainPage.css';

export default function MainPage({ classes }) {
  return (
    <div>
      <div className="classes-container">
        {classes.map((c) => (
          <Link className="class-link"to={`/classes/${c._id}`} key={c._id}>
            <div className="class-card">
              <img src={c.icon} alt={c.name} />
              <h3>{c.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
