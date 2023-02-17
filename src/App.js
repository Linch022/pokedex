import DisplayPokemon from './components/DisplayPokemon';
import Header from './components/Header';
import './styles/pokemonsTypes.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <DisplayPokemon />
    </div>
  );
}

export default App;
