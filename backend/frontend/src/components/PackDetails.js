import { useAuthContext } from "../hooks/useAuthContext"
import useUserData from "../hooks/useUserData"
import { useUserContext } from "../hooks/useUserContext"
import '../packDetails.css'; // Import your CSS file

const PackDetails = ({ pack, onError }) => {
    const { user } = useAuthContext()
    const { fetchUserData } = useUserData()
    const { updateUserCoins } = useUserContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        try {
            const response = await fetch('/api/packs/purchase/' + pack._id, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (!response.ok) {
                onError(json.error); // Pass the error message to the parent component
                return;
            }
            await fetchUserData()
            updateUserCoins(json)
        } catch (error) {
            console.error(error)
            onError('An error occurred while purchasing the pack.');
        }
    }

    return (
        <div className="pack-details">
            <h4>{pack.name}</h4>
            <p className="price"><strong>Price: </strong>{pack.price}</p>
            <button className="purchase-button" onClick={handleClick}>Purchase</button>
        </div>
    )
}

export default PackDetails;
