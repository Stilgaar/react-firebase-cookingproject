import './Home.css'
import RecipeList from '../../Components/RecipeList'
import { projetFirestore } from '../../Firebase/config';
import { useEffect, useState } from 'react';
import useTheme from '../../Hooks/useTheme';

function Home() {

    const { mode } = useTheme()

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {

        setIsPending(true)

        const unsub = projetFirestore
            .collection('recipes')
            .onSnapshot((snapshot) => {
                if (snapshot.empty) {
                    setError('Aucune recette à charger')
                    setIsPending(false)
                } else {
                    let results = []
                    snapshot.docs.forEach(doc => {
                        results.push({ id: doc.id, ...doc.data() })
                    })
                    setData(results)
                    setIsPending(false)
                }
            },
                (err) => {
                    setError(err.message)
                    setIsPending(false)
                })

        return () => unsub()

    }, [])

    return (
        <div className='home'>
            {isPending && <p className={`loading ${mode}`}> Loading ... </p>}
            {error && <p className='error'>{error}</p>}
            {data && <RecipeList recipes={data} />}

        </div>

    );
}

export default Home;