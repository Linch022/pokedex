import DisplayPokemonBis from './components/DisplayPokemonBis';
import Header from './components/Header';
import './styles/pokemonsTypes.css';
import './styles/pokemonsCards.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <DisplayPokemonBis />
    </div>
  );
}

export default App;
