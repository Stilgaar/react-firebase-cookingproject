import './Search.css'

import { useLocation } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch'
import RecipeList from '../../Components/RecipeList';

function Search() {

    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')

    const { isPending, error, data } = useFetch(`http://localhost:3000/recipes/?q=${query}`)

    return (
        <div>
            <h2 className='page-title'>Recettes incluant {query} </h2>
            {isPending && <div>Loading</div>}
            {error && <div>{error}</div>}
            {data && <RecipeList recipes={data} />}
        </div>
    );
}

export default Search;