import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className='nav'>
        <Link to={'/'}>
          <h3>pokedex</h3>
        </Link>
      </div>
    </div>
  );
};

export default Header;
