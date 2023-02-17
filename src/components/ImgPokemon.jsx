import React from 'react';

const ImgPokemon = ({ data }) => {
  const imagePokemon = data.sprites.other.dream_world.front_default;
  return (
    <div>
      <img className={`image-pokemon`} src={imagePokemon} alt={data.name} />
    </div>
  );
};

export default ImgPokemon;
