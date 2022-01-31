import './Recipe.css';
import { useParams } from 'react-router-dom';
import useTheme from '../../Hooks/useTheme';
import { useEffect, useState } from 'react';
import { projetFirestore } from '../../Firebase/config';

function Recipe() {

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const { mode } = useTheme()
    const { id } = useParams()

    useEffect(() => {

        setIsPending(true)

        const unsub = projetFirestore
            .collection('recipes')
            .doc(id)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    setIsPending(false)
                    setRecipe(doc.data())
                } else {
                    setIsPending(false)
                    setError("Recette Introuvable")
                }
            })

        return () => unsub()

    }, [id])

    const handleClick = () => {
        projetFirestore
            .collection('recipes')
            .doc(id)
            .update({
                title: "Autre Chose"
            })
    }

    return (
        <div className={`recipe ${mode}`}>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {recipe &&
                <>
                    <h2 className='page-title'>{recipe.title}</h2>
                    <p>Vous prendra {recipe.cookingTime} à faire</p>
                    <ul>
                        {recipe.ingredients.map(ingre => <li key={ingre} >{ingre}</li>)}
                    </ul>
                    <p className='method'>{recipe.method}</p>
                    <button className='btn' onClick={handleClick}>Update Recette</button>
                </>
            }
        </div>
    );
}

export default Recipe
