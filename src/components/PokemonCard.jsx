import React from 'react';
import ImgPokemon from './ImgPokemon';
import PokemonsTypesList from './PokemonsTypesList';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={`pokemon-card ${pokemon.types[0].type.name}-img`}>
      <div className='text-card'>
        <h2>{pokemon.name}</h2>
        <PokemonsTypesList data={pokemon.types} />
      </div>
      <ImgPokemon data={pokemon} />
    </div>
  );
};

export default PokemonCard;
