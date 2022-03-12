import React from 'react';
import './card.css';

const Card = ({ title, text, number, created, updated }) => {
  return (
      <div className="card">
        <h2>{title === "negative" ? "Egreso" : title === "positive" ? "Ingreso" : title}</h2>
        <div className="line-card"></div>
        <p>{title === "Balance" ? `$ ${text}` : text}</p>
        {number !== null && (
          <p>
            $ {number}
          </p>
        )}
        <div className="line-card"></div>
        <div className="dates-card">
          {created !== undefined && <p className='dates-text'>Creado: {created.substr(0,10)}</p>}
          {updated !== created && <p className='dates-text'>Último cambio: {updated.substr(0,10)}</p>}
        </div>
      </div>
  )
};

export default Card;