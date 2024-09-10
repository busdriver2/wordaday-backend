import { useEffect } from "react"
import { useWordsContext } from "../hooks/useWordsContext"
import { useAuthContext } from "../hooks/useAuthContext"



import WordOfTheDay from '../components/WordOfTheDay'
import ProgressMeter from "../components/ProgressMeter"


const Dashboard = () => {
    const {user} = useAuthContext()

    return (
        <div>
            <div className="dashboard">
            <WordOfTheDay/>
            </div>
            <div>
                <h1>Current Progress</h1>
                <ProgressMeter/>
                </div>
        </div>
        

    )
}

export default Dashboard