import React from 'react';
import PokemonsTypesList from './PokemonsTypesList';

const PokemonCard = ({ pokemon }) => {
  return (
    <div
      className={`pokemon-card ${
        pokemon.apiTypes.length === 2
          ? pokemon.apiTypes[1].name + '-' + pokemon.apiTypes[0].name
          : pokemon.apiTypes[0].name
      }`}
    >
      <div className='text-card'>
        <h2>{pokemon.name}</h2>
        <PokemonsTypesList data={pokemon.apiTypes} />
      </div>
      <div>
        <img
          className={`image-pokemon`}
          src={pokemon.image}
          alt={pokemon.name}
        />
      </div>
    </div>
  );
};

export default PokemonCard;
