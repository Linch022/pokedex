import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

const DisplayPokemon = () => {
  const [choice, setChoice] = useState('/generation/1');
  const [apiUrl, setApiUrl] = useState(`https://pokeapi.co/api/v2${choice}`);
  const [pokemonsNames, setPokemonsNames] = useState([]);
  const [pokemonsUrls, setPokemonsUrls] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [isloaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(apiUrl);
      const names = data.pokemon_species.map((pokemon) => pokemon.name);
      setPokemonsNames(names);
    };
    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (pokemonsNames.length === 151) {
      setIsLoaded(true);
    }
  }, [pokemonsNames]);

  useEffect(() => {
    const setUrls = pokemonsNames.map(
      (name) => `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    setIsLoaded(false);
    setPokemonsUrls(setUrls);
  }, [isloaded, pokemonsNames]);

  useEffect(() => {
    const getPokemonData = pokemonsUrls.map((url) => axios.get(url));
    let pokemonDataArray = [];
    getPokemonData.forEach((promise) => {
      promise
        .then((response) => {
          pokemonDataArray.push(response.data);
          const sortedData = pokemonDataArray.sort((a, b) => a.id - b.id);
          setPokemonData(sortedData);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [pokemonsUrls]);

  useEffect(() => {
    setApiUrl(`https://pokeapi.co/api/v2${choice}`);
  }, [choice]);

  return (
    <div>
      <div className='generation-button-container'>
        <button
          type='button'
          onClick={() => {
            setChoice('/generation/1');
          }}
        >
          Génération 1
        </button>
        <button
          type='button'
          onClick={() => {
            setChoice('/generation/2');
          }}
        >
          Génération 2
        </button>
        <button
          type='button'
          onClick={() => {
            setChoice('/generation/3');
          }}
        >
          Génération 3
        </button>
        <button
          type='button'
          onClick={() => {
            setChoice('/generation/4');
          }}
        >
          Génération 4
        </button>
        <button
          type='button'
          onClick={() => {
            setChoice('/generation/5');
          }}
        >
          Génération 5
        </button>
        <button
          type='button'
          onClick={() => {
            setChoice('/generation/6');
          }}
        >
          Génération 6
        </button>
        <button
          type='button'
          onClick={() => {
            setChoice('/generation/7');
          }}
        >
          Génération 7
        </button>
        <button
          type='button'
          onClick={() => {
            setChoice('/generation/8');
          }}
        >
          Génération 8
        </button>
        <button
          type='button'
          onClick={() => {
            setChoice('/generation/9');
          }}
        >
          Génération 9
        </button>
      </div>
      <div className='pokemon-card-container'>
        {pokemonData
          ? pokemonData.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          : null}
      </div>
    </div>
  );
};

export default DisplayPokemon;
