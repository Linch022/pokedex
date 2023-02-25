import React from 'react';

const GenerationButton = ({
  selectedGeneration,
  setChoice,
  setSelectedGeneration,
  name,
  url,
}) => {
  return (
    <button
      className={
        selectedGeneration === url
          ? 'generation-button selected'
          : 'generation-button'
      }
      type='button'
      onClick={() => {
        setChoice(url);
        setSelectedGeneration(url);
      }}
    >
      {name}
    </button>
  );
};

export default GenerationButton;
