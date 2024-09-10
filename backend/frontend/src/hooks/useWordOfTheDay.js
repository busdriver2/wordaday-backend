import { useState, useEffect } from 'react'

import { useAuthContext } from '../hooks/useAuthContext'

export const useWordOfTheDay = () => {
    const [isLoading, setisLoading] = useState(null)
    const [word, setWord] = useState(null);
    const [error, setError] = useState(null);
    const [wordId, setWordId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [definition, setDefinition] = useState(null)
    const [status, setStatus] = useState(null)
    
    const { user }= useAuthContext()

    const fetchRandomWord = async () => {
        setisLoading(true)
        setError(null)
        const response = await fetch('/api/words/wordOfTheDay', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (!response.ok) {
            setisLoading(false)
            console.log(response)
            throw new Error('failed to fetch the word')
        }
        const json = await response.json()
        
        if (!json) {
            setisLoading(false)
            setError(json.error)
            return
        }
        
        if (!json.wordId) {
            setisLoading(false)
            setError(json.error)
            return
        }
        const response2 = await fetch('/api/words/' + json.wordId, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json2 = await response2.json()
        setisLoading(false)
        setWord(json2.name)
        setWordId(json.wordId)
        setUserId(json.userId)
        setDefinition(json2.definition)
        setStatus(json.status)


        }

        return { fetchRandomWord, word, error, wordId, userId, definition, status, isLoading }
    }


