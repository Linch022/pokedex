import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const DisplayPokemon = () => {
  const [choice, setChoice] = useState('generation/1');
  const [apiUrl, setApiUrl] = useState(
    `https://pokebuildapi.fr/api/v1/pokemon/${choice}`
  );
  const [pokemonData, setPokemonData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  // const [isloaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(apiUrl);
      setPokemonData(data);
    };
    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    setApiUrl(`https://pokebuildapi.fr/api/v1/pokemon/${choice}`);
  }, [choice]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className='pokemon-display-container'>
      <div className='search-option-container'>
        <div className='search-input'>
          <label>
            Recherche par nom ou numéro:
            <input
              type='text'
              placeholder='Bonjour'
              value={searchValue}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className='generation-button-container'>
          <button
            className='generation-button'
            type='button'
            onClick={() => {
              setChoice('/generation/1');
            }}
          >
            Gen 1
          </button>
          <button
            className='generation-button'
            type='button'
            onClick={() => {
              setChoice('generation/2');
            }}
          >
            Gen 2
          </button>
          <button
            className='generation-button'
            type='button'
            onClick={() => {
              setChoice('generation/3');
            }}
          >
            Gen 3
          </button>
          <button
            className='generation-button'
            type='button'
            onClick={() => {
              setChoice('generation/4');
            }}
          >
            Gen 4
          </button>
          <button
            className='generation-button'
            type='button'
            onClick={() => {
              setChoice('generation/5');
            }}
          >
            Gen 5
          </button>
          <button
            className='generation-button'
            type='button'
            onClick={() => {
              setChoice('generation/6');
            }}
          >
            Gen 6
          </button>
          <button
            className='generation-button'
            type='button'
            onClick={() => {
              setChoice('generation/7');
            }}
          >
            Gen 7
          </button>
          <button
            className='generation-button'
            type='button'
            onClick={() => {
              setChoice('generation/8');
            }}
          >
            Gen 8
          </button>
          <button
            className='generation-button'
            type='button'
            onClick={() => {
              setChoice('');
            }}
          >
            all gen
          </button>
        </div>
      </div>
      <div className='pokemon-card-container'>
        {pokemonData
          ? // pokemonData.length === 1 ? (
            //   <PokemonCard key={pokemonData.id} pokemon={pokemonData} />
            // ) : (
            pokemonData
              .filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((pokemon) => (
                <Link key={pokemon.id} to={`/pokemon/${pokemon.name}`}>
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                </Link>
              ))
          : // )
            null}
      </div>
    </div>
  );
};

export default DisplayPokemon;
