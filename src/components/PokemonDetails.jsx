import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PokemonsTypesList from './PokemonsTypesList';

const PokemonDetails = () => {
  const params = useParams();
  const pokemonName = params.name;
  const urlApi = `https://pokebuildapi.fr/api/v1/pokemon/${pokemonName}`;
  const [pokemonData, setPokemonData] = useState();
  const [evolution, setEvolution] = useState();
  const [preEvolution, setPreEvolution] = useState();

  useEffect(() => {
    if (pokemonData) {
      getEvolution(pokemonData);
      getPreEvolution(pokemonData);
    }
  }, [pokemonData]);

  const getEvolution = (pokemon) => {
    if (pokemon.apiEvolutions && pokemon.apiEvolutions.length === 1) {
      const name = pokemon.apiEvolutions[0].name;
      console.log(pokemon);
      const urlApiEvolution = `https://pokebuildapi.fr/api/v1/pokemon/${name}`;
      const fetchData = async () => {
        const { data } = await axios.get(urlApiEvolution);
        setEvolution(data);
      };
      fetchData();
    } else if (pokemon.apiEvolutions && pokemon.apiEvolutions.length > 1) {
      const evolutionsData = [];
      pokemon.apiEvolutions.forEach((evolution) => {
        const name = evolution.name;
        const urlApiEvolution = `https://pokebuildapi.fr/api/v1/pokemon/${name}`;
        console.log(urlApiEvolution);
        const fetchData = async () => {
          const { data } = await axios.get(urlApiEvolution);
          evolutionsData.push(data);
          console.log(data);
          console.log(name);
          if (evolutionsData.length === pokemon.apiEvolutions) {
            setEvolution(evolutionsData);
          }
        };
        fetchData();
      });
    }
  };

  const getPreEvolution = (data) => {
    if (data.apiPreEvolution !== 'none') {
      const name = data.apiPreEvolution.name;
      const urlApiPreEvolution = `https://pokebuildapi.fr/api/v1/pokemon/${name}`;
      const fetchData = async () => {
        const { data } = await axios.get(urlApiPreEvolution);
        setPreEvolution(data);
      };
      fetchData();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(urlApi);
      setPokemonData(data);
    };
    fetchData();
  }, [urlApi]);
  return (
    <div className='pokemon-details-container'>
      {pokemonData ? (
        <div>
          <div
            className={`pokemon-details-card ${
              pokemonData.apiTypes.length === 2
                ? pokemonData.apiTypes[1].name +
                  '-' +
                  pokemonData.apiTypes[0].name
                : pokemonData.apiTypes[0].name
            }`}
          >
            <div className='text-details-container'>
              <div className='text-name-details'>
                <h2>{pokemonData.name}</h2>
              </div>
              <div className='text-types-details'>
                <PokemonsTypesList data={pokemonData.apiTypes} />
              </div>
              <div className='stat-pokemon-details'>
                <h4 className='text-stat-details'>
                  pv : {pokemonData.stats.HP}
                </h4>
                <h4 className='text-stat-details'>
                  attaque : {pokemonData.stats.attack}
                </h4>
                <h4 className='text-stat-details'>
                  défense : {pokemonData.stats.defense}
                </h4>
                <h4 className='text-stat-details'>
                  Attaque spé : {pokemonData.stats.special_attack}
                </h4>
                <h4 className='text-stat-details'>
                  Défense spé : {pokemonData.stats.special_defense}
                </h4>
                <h4 className='text-stat-details'>
                  vitesse : {pokemonData.stats.speed}
                </h4>
              </div>
            </div>
            <div>
              <img
                className={`image-pokemon-details`}
                src={pokemonData.image}
                alt={pokemonData.name}
              />
            </div>
          </div>
          {preEvolution ? (
            <div className='pre-evolution'>
              <h1>{preEvolution.name}</h1>
            </div>
          ) : null}
          {evolution ? (
            <div className='evolutions'>
              {Array.isArray(evolution) ? (
                evolution.map((pokemon) => (
                  <div key={pokemon.name} className='evolution'>
                    <h1>{pokemon.name}</h1>
                  </div>
                ))
              ) : (
                <div className='evolution'>
                  <h1>{evolution.name}</h1>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default PokemonDetails;