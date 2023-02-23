import DisplayPokemon from './components/DisplayPokemon';
import './styles/pokemonsTypes.css';
import './styles/pokemonsCards.css';
import './styles/displayPokemon.css';
import './styles/pokemonDetails.css';
import { Route, Routes } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<DisplayPokemon />} />
        <Route path='/pokemon/:name' element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
