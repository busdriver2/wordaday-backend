import React, { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
// Create a UserContext
export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [User, setUser] = useState(null);
    const { user } = useAuthContext()
    useEffect(() => {
        const fetchUserPoints = async () => {
          if (user) {
            const response = await fetch(`/api/user/${user.email}`);
            const json = await response.json();
            if (response.ok) {
              setUser(json);  // Set the user data including points
            } else {
              console.error("Failed to fetch user points.");
            }
          }
        };
    
        fetchUserPoints(); // Fetch user data when the component mounts
      }, [user]);

    

    const updateUserPoints = (newPoints) => {
        setUser((prevUser) => ({
          ...prevUser,
          points: newPoints,
        }));
      };

      const updateUserCoins = (newCoins) => {
        setUser((prevUser) => ({
          ...prevUser,
          coins: newCoins,
        }));
      };
    
  
    return (
      <UserContext.Provider value={{ User, setUser , updateUserPoints, updateUserCoins}}>
        {children}
      </UserContext.Provider>
    );
  };
  