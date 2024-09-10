import { useEffect, useState } from 'react'
import { useWordsContext } from "../hooks/useWordsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useWordOfTheDay } from '../hooks/useWordOfTheDay'
import { useUserContext } from '../hooks/useUserContext'
import Timer from './Timer'


const WordOfTheDay = () => {
    
    const [Error, setError] = useState(null)
    const { user }= useAuthContext()
    const { fetchRandomWord, word, error, wordId, userId, definition, status, isLoading } = useWordOfTheDay()
    const [WordStatus, setWordStatus] = useState(status)
    const { User, updateUserPoints } = useUserContext()
    
    const updateWordBank = async (action) => {
        const body = {userId, wordId, action}
        const response = await fetch('/api/words/updateWordBank', {
            method: 'POST',
            body: JSON.stringify(body)
            ,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok) {
            setError(json.error)
        }
    }

    const givePoints = async () => {
        console.log("POINTS FOR USER:" + User)
        const response = await fetch('/api/user/give/5', {
            method: 'POST',
            body: JSON.stringify(user)
            ,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        console.log(json.points)

        if (response.ok) {
            updateUserPoints(json.points);  // Update points in context
        } else {
            setError(json.error);
        }
    }

    const thumbsUp = () => {
        updateWordBank('thumbsUp')
        setWordStatus("known")
        givePoints()
    }

    const thumbsDown = () => {
        updateWordBank('thumbsDown')
        setWordStatus("learning")
        givePoints()
    }

    // Fetch word when component mounts
    useEffect(() => {
        fetchRandomWord()    
        console.log("USER CONTEXT:" + JSON.stringify(User))    
    }, [])

    // Update WordStatus when status changes. (useWordOfTheDay() is async)
    useEffect(() => {
        if (status) {
            setWordStatus(status);
        }
    }, [status]);
    

    // MOVE ALL THE STYLE ELEMENTS TO CSS FOLDER
    return (
        <header  style={{ textAlign: 'center', padding: '20px' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div >
        {word && (
          <div >
            <h2>{word}</h2>
            <p><strong>Definition:</strong> {definition}</p>
            <p><strong>Status:</strong> {WordStatus}</p>
          </div>
        )}
        
            <button className='material-symbols-outlined gray_button' disabled={isLoading} onClick={fetchRandomWord}>
            Refresh
            </button>
            <button className='material-symbols-outlined' disabled={isLoading} onClick={thumbsUp}>
            thumb_up
            </button>
            <button className='material-symbols-outlined red_button' disabled={isLoading} onClick={thumbsDown} >
            thumb_down
            </button>
        </div>
        <h1 ><Timer/></h1>
      </header>
    )


}
export default WordOfTheDay