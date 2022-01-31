import { Link } from 'react-router-dom'
import useTheme from '../Hooks/useTheme';

import './Navbar.css'
import SeachBar from './SearchBar';


function Navbar() {

    const { color } = useTheme()

    return (
        <div className='navbar' style={{ background: color }}>
            <nav>
                <Link to='/' className='brand'>
                    <h1>Cooking Papa</h1>
                </Link>
                <SeachBar />
                <Link to="/create">Crée une Recette</Link>
            </nav>
        </div>

    );
}

export default Navbar

