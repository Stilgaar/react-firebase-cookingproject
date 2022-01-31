import './RecipeList.css';
import { Link } from 'react-router-dom'
import useTheme from '../Hooks/useTheme';
import trashCan from '../assets/delete.svg'
import { projetFirestore } from '../Firebase/config';

function RecipeList({ recipes }) {

    const { mode } = useTheme()

    if (recipes.length === 0) {
        return <div className='error'>Aucune recette trouvée</div>
    }

    const handleClick = (id) => {
        projetFirestore
            .collection('recipes')
            .doc(id)
            .delete()
    }

    return (
        <div className='recipe-list'>
            {recipes.map(recipe => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <h3 >{recipe.title}</h3>
                    <p>Vous prendra {recipe.cookingTime}</p>
                    <div>{recipe.method.substring(0, 100)}... </div>
                    <Link to={`/recipe/${recipe.id}`}> Cuisiner ?</Link>
                    <img
                        className='delete'
                        src={trashCan}
                        alt="trashcan icon"
                        onClick={() => handleClick(recipe.id)}
                    />
                </div>
            ))}
        </div>
    );
}

export default RecipeList;