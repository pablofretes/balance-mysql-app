import React from 'react';
import './card.css';

const Card = ({ title, text, number }) => {
  return (
      <div className="card">
        <h2>{title === 'negative' ? 'Egreso' : title === 'positive' ? 'Ingreso' : title}</h2>
        <div className="line"></div>
        <p>{text}</p>
        {number !== null && (
            <p>
              {number}
            </p>
          )}
      </div>
  )
};

export default Card;