import React from 'react';
import ImgPokemon from './ImgPokemon';
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
      <ImgPokemon data={pokemon} />
    </div>
  );
};

export default PokemonCard;
