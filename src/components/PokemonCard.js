'use client';
import React from 'react';

const PokemonCard = ({ pokemon, isSelected, onClick }) => {
  return (
    <div
      onClick={() => onClick(pokemon)}
      className={`pokemon-card ${isSelected ? 'selected' : ''}`}
    >
      <span className="uppercase font-semibold">{pokemon.name}</span>
    </div>
  );
};

export default PokemonCard;
