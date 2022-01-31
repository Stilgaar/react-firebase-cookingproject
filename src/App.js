// styles
import './App.css'
//Routeur
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Pages
import Home from './Pages/Home/Home';
import Create from './Pages/Create/Create'
import Search from './Pages/Search/Search'
import Recipe from './Pages/Recipe/Recipe'
// Composants 
import Navbar from './Components/Navbar';
import ThemeSelector from './Components/ThemeSelector';
import useTheme from './Hooks/useTheme';

function App() {

  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/create'>
            <Create />
          </Route>
          <Route exact path='/search'>
            <Search />
          </Route>
          <Route exact path='/recipe/:id'>
            <Recipe />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App
