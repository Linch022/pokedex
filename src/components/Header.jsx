import React from 'react';
import '../styles/header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='left-part-header'></div>
      <div className='right-part-header'></div>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg'
        alt='logo pokemon'
        className='pokemon-logo'
      />
    </div>
  );
};

export default Header;
