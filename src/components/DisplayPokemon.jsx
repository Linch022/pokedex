import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GenerationButton from './GenerationButton';
import PokemonCard from './PokemonCard';
import TypesButtons from './TypesButtons';

const DisplayPokemon = () => {
  const [choice, setChoice] = useState('generation/1');
  const [selectedGeneration, setSelectedGeneration] = useState('generation/1');
  const listTypes = [
    'Vol',
    'Feu',
    'Eau',
    'Psy',
    'Poison',
    'Sol',
    'Plante',
    'Insecte',
    'Roche',
    'Glace',
    'Spectre',
    'Ténèbres',
    'Dragon',
    'Électrik',
    'Combat',
    'Acier',
    'Fée',
    'Normal',
  ];
  const [selectedTypes, setSelectedTypes] = useState(listTypes);
  const [apiUrl, setApiUrl] = useState(
    `https://pokebuildapi.fr/api/v1/pokemon/${choice}`
  );
  const [pokemonData, setPokemonData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [typesFilters, setTypesFilters] = useState(selectedTypes);

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

  useEffect(() => {
    setTypesFilters(selectedTypes);
  }, [selectedTypes]);

  const handleResearchInputChange = (e) => {
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
              placeholder='pikachu'
              value={searchValue}
              onChange={handleResearchInputChange}
            />
          </label>
        </div>
        <div className='generation-button-container'>
          <GenerationButton
            name={'gen 1'}
            setChoice={setChoice}
            selectedGeneration={selectedGeneration}
            setSelectedGeneration={setSelectedGeneration}
            url={'generation/1'}
          />
          <GenerationButton
            name={'gen 2'}
            setChoice={setChoice}
            selectedGeneration={selectedGeneration}
            setSelectedGeneration={setSelectedGeneration}
            url={'generation/2'}
          />
          <GenerationButton
            name={'gen 3'}
            setChoice={setChoice}
            selectedGeneration={selectedGeneration}
            setSelectedGeneration={setSelectedGeneration}
            url={'generation/3'}
          />
          <GenerationButton
            name={'gen 4'}
            setChoice={setChoice}
            selectedGeneration={selectedGeneration}
            setSelectedGeneration={setSelectedGeneration}
            url={'generation/4'}
          />
          <GenerationButton
            name={'gen 5'}
            setChoice={setChoice}
            selectedGeneration={selectedGeneration}
            setSelectedGeneration={setSelectedGeneration}
            url={'generation/5'}
          />
          <GenerationButton
            name={'gen 6'}
            setChoice={setChoice}
            selectedGeneration={selectedGeneration}
            setSelectedGeneration={setSelectedGeneration}
            url={'generation/6'}
          />
          <GenerationButton
            name={'gen 7'}
            setChoice={setChoice}
            selectedGeneration={selectedGeneration}
            setSelectedGeneration={setSelectedGeneration}
            url={'generation/7'}
          />
          <GenerationButton
            name={'gen 8'}
            setChoice={setChoice}
            selectedGeneration={selectedGeneration}
            setSelectedGeneration={setSelectedGeneration}
            url={'generation/8'}
          />
          <GenerationButton
            name={'all gen'}
            setChoice={setChoice}
            selectedGeneration={selectedGeneration}
            setSelectedGeneration={setSelectedGeneration}
            url={''}
          />
        </div>
        <div className='types-button-container'>
          {listTypes.map((type) => (
            <TypesButtons
              key={type}
              name={type}
              setSelectedTypes={setSelectedTypes}
              selectedTypes={selectedTypes}
            />
          ))}
        </div>
      </div>
      <div className='pokemon-card-container'>
        {pokemonData
          ? pokemonData
              .filter(
                (pokemon) =>
                  pokemon.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  pokemon.id.toString().includes(searchValue)
              )
              .filter((pokemon) =>
                pokemon.apiTypes.some((type) =>
                  typesFilters.includes(type.name)
                )
              )
              .map((pokemon) => (
                <Link key={pokemon.id} to={`/pokemon/${pokemon.name}`}>
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                </Link>
              ))
          : null}
      </div>
    </div>
  );
};

export default DisplayPokemon;
