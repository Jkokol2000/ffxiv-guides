import React from 'react';
import ClassForm from '../../components/ClassForm/ClassForm';

export default function MainPage({classes}) {
    return(
        <div>
        <div className="classes-container">
        {classes.map((c) => (
          <button key={c._id}>{c.name}</button>
        ))}
        
      </div>
      <ClassForm />
      </div>
      
    );
}