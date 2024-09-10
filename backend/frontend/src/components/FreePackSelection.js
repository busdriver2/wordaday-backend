import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import '../packSelection.css'

const FreePackSelection = () => {
    const [selectedPack, setSelectedPack] = useState(null);
    const [error, setError] = useState(null);
    const {user} = useAuthContext()
    const navigate = useNavigate();
    
    const handlePackSelection = async () => {
        //console.log(user)
        try {

            const response = await fetch('/api/packs/select-pack', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, packId: selectedPack }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/'); // Or another route
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('An error occurred while selecting the pack');
        }
    };

    return (
        <div className="free-pack-selection">
            <h3>Select Your Free Pack</h3>
            <div className="pack-buttons">
                <button 
                    className={`pack-button ${selectedPack === '66cd932dbf8c99d6c76f7d7d' ? 'selected' : ''}`} 
                    onClick={() => setSelectedPack('66cd932dbf8c99d6c76f7d7d')}
                >
                    Pack 1
                </button>
                <button 
                    className={`pack-button ${selectedPack === '66cd932fbf8c99d6c76f7d9d' ? 'selected' : ''}`} 
                    onClick={() => setSelectedPack('66cd932fbf8c99d6c76f7d9d')}
                >
                    Pack 2
                </button>
                <button 
                    className={`pack-button ${selectedPack === '66cd9332bf8c99d6c76f7dbd' ? 'selected' : ''}`} 
                    onClick={() => setSelectedPack('66cd9332bf8c99d6c76f7dbd')}
                >
                    Pack 3
                </button>
            </div>
            <button 
                className="confirm-button" 
                onClick={handlePackSelection} 
                disabled={!selectedPack}
            >
                Confirm Pack
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
};

export default FreePackSelection;
