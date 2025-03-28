'use client';
import React, { useState, useEffect } from 'react';
import { getPokemonList } from '@/services/PokemonService';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonList(12);
      setPokemonList(data);
      // Selección por defecto (por ejemplo, "squirtle")
      setSelectedPokemon(data.find(p => p.name === 'squirtle'));
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Contenedor central para los paneles */}
      <div className="flex gap-12 bg-white rounded-xl shadow-xl p-8">
        
        {/* Panel de la lista de Pokémon */}
        <div className="pokemon-list flex flex-col items-center w-64">
          <h2 className="text-xl font-bold mb-4">Pokémon</h2>
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isSelected={selectedPokemon?.id === pokemon.id}
              onClick={setSelectedPokemon}
            />
          ))}
        </div>
        
        {/* Panel de detalles del Pokémon seleccionado */}
        {selectedPokemon && (
          <div className="pokemon-details flex flex-col items-center w-96">
            <h2 className="text-2xl font-bold uppercase mb-4">
              {selectedPokemon.name}
            </h2>
            <div className="flex gap-4 mb-4">
              <img
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                className="w-24 h-24"
              />
              {selectedPokemon.backImage && (
                <img
                  src={selectedPokemon.backImage}
                  alt={`${selectedPokemon.name} back`}
                  className="w-24 h-24"
                />
              )}
            </div>
            <div className="text-lg">
              <p>
                <strong>Altura:</strong> {selectedPokemon.height}
              </p>
              <p>
                <strong>Peso:</strong> {selectedPokemon.weight}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
