import React from 'react';

const PokemonsTypesList = ({ data }) => (
  <ul className='types-list'>
    {data.map((type, index) => (
      <li className={`${type.name}-type ${'type'}`} key={index}>
        {type.name}
      </li>
    ))}
  </ul>
);

export default PokemonsTypesList;
