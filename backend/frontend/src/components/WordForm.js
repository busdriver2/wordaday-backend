import { useState } from 'react'
import { useWordsContext } from "../hooks/useWordsContext"
import { useAuthContext } from '../hooks/useAuthContext'



const WordForm = () => {
    const { dispatch } = useWordsContext()
    const { user }= useAuthContext()

    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [definition, setDefinition] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFIelds] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const word = {id, name, definition}

        const response = await fetch('/api/words', {
            method: 'POST',
            body: JSON.stringify(word),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        console.log(json)

        if (!response.ok) {
            setError(json.error)
            setEmptyFIelds(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setId('')
            setDefinition('')
            setError(null)
            setEmptyFIelds([])
            console.log('new word added', json)
            dispatch({type: 'CREATE_WORD', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Word</h3>

            <label>Word name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>id:</label>
            <input
                type="number"
                onChange={(e) => setId(e.target.value)}
                value={id}
                className={emptyFields.includes('id') ? 'error' : ''}
            />

            <label>Definition:</label>
            <input
                type="text"
                onChange={(e) => setDefinition(e.target.value)}
                value={definition}
                className={emptyFields.includes('definition') ? 'error' : ''}
            />

            <button>Create Word</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WordForm