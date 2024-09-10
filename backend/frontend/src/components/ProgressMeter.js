import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext"
import useUserData from "../hooks/useUserData"
import { useUserContext } from '../hooks/useUserContext';

import '../progressMeter.css';

const ProgressMeter = () => {
  const [progress, setProgress] = useState(0);
  const { user } = useAuthContext()
  const { User } = useUserContext()
  const {fetchUserData, userData} = useUserData()

  useEffect(() => {
    if (User && User.points !== undefined) {
        console.log(User)
      setProgress(User.points);
    }
  }, [User]);

  const completeTask = () => {
    // Animate progress bar to fill up when task is completed
    setProgress(100); // Example: set to 100% when task is completed
  };

  if (!User) {
    // Show a loading state or 0% progress if user data hasn't loaded yet
    return <div className="progress-container">Loading...</div>;
  }

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressMeter;
