import './Create.css'
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import useTheme from '../../Hooks/useTheme';
import { projetFirestore } from '../../Firebase/config';

function Create() {

    const { mode } = useTheme()

    const [title, setTitle] = useState("")
    const [method, setMethod] = useState("")
    const [cookingTime, setCookingTime] = useState("")
    const [newIngridient, setNewIngredient] = useState('')
    const [ingredients, setIngridients] = useState([])
    const ingredientInput = useRef(null)
    const histo = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const doc = { title, ingredients, method, cookingTime: cookingTime + ' minutes' }

        try {
            await projetFirestore
                .collection('recipes')
                .add(doc)
            histo.push('/')
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngridient.trim()

        if (ing && !ingredients.includes(ing)) {
            setIngridients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }

    return (
        <div className='create'>
            <h2 className={`page-title ${mode}`}>Rajouter une nouvelle recette</h2>

            <form onSubmit={handleSubmit}>

                <label>
                    <span>Titre de la Recette</span>
                    <input type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Ingredients</span>
                    <div className='ingredients'>
                        <input type="text"
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngridient}
                            ref={ingredientInput} />
                        <button className='btn' onClick={handleAdd}>add</button>
                    </div>
                </label>

                {ingredients && <p> Ingrédients :  {ingredients.map(i => <em key={i}>{i},</em>)} </p>}

                <label>
                    <span>Description Recette</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required />
                </label>

                <label>
                    <span> Temps de préparation (en minutes) </span>
                    <input type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required />
                </label>

                <button className='btn'> Envoyer </button>

            </form>
        </div>
    );
}

export default Create;