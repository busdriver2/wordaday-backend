import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import PackDetails from "../components/PackDetails"
import '../store.css'; // Import your CSS file

const Store = () => {
    const { user } = useAuthContext()
    const [packs, setPacks] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPacks = async () => {
            try {
                const response = await fetch('/api/packs', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()

                if (response.ok) {
                    setPacks(json)
                } else {
                    setError('Failed to fetch packs.');
                }
            } catch (err) {
                setError('An error occurred while fetching packs.');
            }
        }

        if (user) {
            fetchPacks()
        }
    }, [user])

    const handleError = (message) => {
        setError(message);
        setTimeout(() => setError(null), 5000); // Clear the error message after 5 seconds
    }

    return (
        <div className="store-container">
            <h2>Pack Store</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="packs-grid">
                {packs.map((pack) => (
                    <PackDetails key={pack._id} pack={pack} onError={handleError} />
                ))}
            </div>
        </div>
    )
}

export default Store;
