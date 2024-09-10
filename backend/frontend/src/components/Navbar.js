import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react'
import useUserData from '../hooks/useUserData'
import { useUserContext } from '../hooks/useUserContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const {fetchUserData, userData} = useUserData()
    const { User } = useUserContext()
    const [Coins, setCoins] = useState(0);

    const handleClick = () => {
        logout()
    }

    useEffect(() => {
        if (User && User.coins !== undefined) {
            console.log(User)
          setCoins(User.coins);
          console.log(User.coins)
        }
      }, [User]);






    return (
        <header>
            <div className="container">
                <Link to="/dashboard">
                    <h1>WordaDay</h1>
                </Link>
                <Link to="/">
                    <h2>Employee Dashboard</h2>
                </Link>
                <Link to="/store">
                    <h2>Store</h2>
                </Link>
                <Link to="/test">
                    <h2>test</h2>
                </Link>

                
                {User && (
                    <div>
                        <span className='material-symbols-outlined'>paid</span>
                        <span>{User.coins}</span>   
                    </div>
                    
                )}
                    
                <nav>
                
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                            
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                            
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar