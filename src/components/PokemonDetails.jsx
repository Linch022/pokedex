import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PokemonCard from './PokemonCard';
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
      const urlApiEvolution = `https://pokebuildapi.fr/api/v1/pokemon/${name}`;
      const fetchData = async () => {
        const { data } = await axios.get(urlApiEvolution);
        setEvolution(data);
      };
      fetchData();
    } else if (pokemon.apiEvolutions && pokemon.apiEvolutions.length > 1) {
      const evolutionsData = [];
      const length = pokemon.apiEvolutions.length;
      pokemon.apiEvolutions.forEach((evolution) => {
        const name = evolution.name;
        const urlApiEvolution = `https://pokebuildapi.fr/api/v1/pokemon/${name}`;
        const fetchData = async () => {
          const { data } = await axios.get(urlApiEvolution);
          evolutionsData.push(data);
          if (evolutionsData.length === length) {
            setEvolution(evolutionsData);
          }
        };
        fetchData();
      });
    }
  };

  const getPreEvolution = (data) => {
    if (data.apiPreEvolution && data.apiPreEvolution !== 'none') {
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

  const resetData = () => {
    setEvolution(null);
  };
  return (
    <div className='pokemon-details-container'>
      {pokemonData ? (
        <>
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
                <h4 className='gen-id-details'>
                  Gen: {pokemonData.apiGeneration} ID: {pokemonData.id}
                </h4>
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
              <div className='capture'>
                <h3>capturer:</h3>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
                  alt='pokeball'
                  className='pokeball'
                />
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
          <div className='evolutions-container'>
            {preEvolution && preEvolution.name !== pokemonData.name ? (
              <div className='pre-evolution'>
                <h3>pré-evolution</h3>
                <Link
                  key={preEvolution.id}
                  to={`/pokemon/${preEvolution.name}`}
                >
                  <PokemonCard key={preEvolution.id} pokemon={preEvolution} />
                </Link>
              </div>
            ) : null}
            {evolution && evolution.name !== pokemonData.name ? (
              <div className='evolutions'>
                <h3>evolution</h3>
                {Array.isArray(evolution) ? (
                  <div className='evolutions-card-container'>
                    {evolution.map((pokemon) => (
                      <Link
                        key={pokemon.id}
                        to={`/pokemon/${pokemon.name}`}
                        onClick={resetData}
                      >
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className='evolution'>
                    <Link key={evolution.id} to={`/pokemon/${evolution.name}`}>
                      <PokemonCard key={evolution.id} pokemon={evolution} />
                    </Link>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PokemonDetails;
