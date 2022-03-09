import React from 'react';
import { Card as BootCard, Container } from 'react-bootstrap';

const Card = ({ title, text, number }) => {
  return (
    <Container>
      <BootCard>
        <BootCard.Title>{title}</BootCard.Title>
        <BootCard.Text>
          {text}
        </BootCard.Text>
        {number !== null && (
          <BootCard.Text>
            {number}
          </BootCard.Text>
        )}
      </BootCard>
    </Container>
  )
};

export default Card;