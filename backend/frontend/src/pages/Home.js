import { useEffect } from "react"
import { useWordsContext } from "../hooks/useWordsContext"
import { useAuthContext } from "../hooks/useAuthContext"


// components
import WordDetails from '../components/WordDetails'
import WordForm from '../components/WordForm'
import WordOfTheDay from '../components/WordOfTheDay'


const Home = () => {
    const {words, dispatch} = useWordsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWords = async () => {
            const response = await fetch('/api/words', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORDS', payload: json})
            }
        }

        if (user) {
            fetchWords()
        }
        
    }, [dispatch, user]) 

    return (
        <div className="home"> 
            <div className="words">
                {words && words.map((word) => (
                    <WordDetails key={word._id} word={word}/>
                ))}
            </div>
            <WordForm />
        </div>
    )
}

export default Home