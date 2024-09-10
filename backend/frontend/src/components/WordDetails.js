import { useWordsContext } from "../hooks/useWordsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WordDetails = ({ word }) => {
    const { dispatch } = useWordsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }


        const response = await fetch('/api/words/' + word._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORD', payload: json})
        }
    }

    return (
        <div className="word-details">
            <h4>{word.name}</h4>
            <p><strong>ID: </strong>{word.id}</p>
            <p><strong>Definition: </strong>{word.definition}</p>
            <p>{formatDistanceToNow(new Date(word.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default WordDetails