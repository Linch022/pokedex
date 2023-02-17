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
  });

  useEffect(() => {
    if (pokemonsNames.length === 151) {
      setIsLoaded(true);
    }
  }, [pokemonsNames]);

  useEffect(() => {
    const setUrls = pokemonsNames.map(
      (name) => `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    setPokemonsUrls(setUrls);
  }, [isloaded]);

  useEffect(() => {
    const getPokemonData = pokemonsUrls.map((url) => axios.get(url));
    let pokemonDataArray = [];
    getPokemonData.forEach((promise) => {
      promise.then((response) => {
        pokemonDataArray.push(response.data);
        if (pokemonDataArray.length === pokemonsUrls.length) {
          const sortedData = pokemonDataArray.sort((a, b) => a.id - b.id);
          console.log(sortedData);
          setPokemonData(sortedData);
        }
      });
    });
  }, [pokemonsUrls]);
  return (
    <div>
      {pokemonData
        ? pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        : null}
    </div>
  );
};

export default DisplayPokemon;
