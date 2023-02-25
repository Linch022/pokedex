import React, { useState } from 'react';

const TypesButtons = ({ name, selectedTypes, setSelectedTypes }) => {
  const [classButton, setClassButton] = useState(`${name}-button-active`);
  const handleSelectedTypes = (name) => {
    if (selectedTypes.includes(name)) {
      const typesName = name;
      const newArraySelectedTypes = selectedTypes.filter(
        (name) => name !== typesName
      );
      setClassButton(`${name}-button-inactive`);
      setSelectedTypes(newArraySelectedTypes);
    } else {
      const newArraySelectedTypes = [...selectedTypes, name];
      setSelectedTypes(newArraySelectedTypes);
      setClassButton(`${name}-button-active`);
    }
  };

  const handleClick = () => {
    handleSelectedTypes(name);
  };
  return (
    <button className={`${classButton} button-type`} onClick={handleClick}>
      {name}
    </button>
  );
};

export default TypesButtons;
