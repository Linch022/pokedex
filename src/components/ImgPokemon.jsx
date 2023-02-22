import React from 'react';

const ImgPokemon = ({ data }) => {
  const imagePokemon = data.image;
  return (
    <div>
      <img className={`image-pokemon`} src={imagePokemon} alt={data.name} />
    </div>
  );
};

export default ImgPokemon;
