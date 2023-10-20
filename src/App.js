import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const TomatoGame = () => {
    // State variables
    const [imageUrl, setImageUrl] = useState(''); // Stores the URL of the tomato image
    const [solution, setSolution] = useState(''); // Stores the correct solution
    const [guess, setGuess] = useState(''); // Stores the user's guess
    const [isCorrect, setIsCorrect] = useState(false); // Tracks if the user's guess is correct

    // Fetches the game data from the API
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://marcconrad.com/uob/tomato/api.php?out=json');
            const data = await response.json();
            setImageUrl(data.question); // Sets the image URL received from the API
            setSolution(data.solution); // Sets the correct solution received from the API
            setIsCorrect(false); // Resets the isCorrect state to false
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    };

    // Handles the user's guess
    const handleGuess = () => {
        const parsedGuess = parseInt(guess, 10);
        if (parsedGuess === solution) {
            toast.success('YOU GUESSED CORRECTLY!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
            });
            setIsCorrect(true); // Sets isCorrect state to true
        } else {
            toast.error('WRONG ANSWER, TRY AGAIN', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
            });
        }
    };

    // Handles the next level button click
    const handleNextLevel = () => {
        fetchData(); // Fetches new game data for the next level
        setGuess(''); // Resets the guess state
    };

    return (
        <div className="container">
            <h1>The Tomato Game</h1>
            <img src={imageUrl} alt="Tomato Game"/>
            <div className="label-input-button-container">
                <label htmlFor="guessInput">Enter the missing digit:</label>
                <input type="number" id="guessInput" value={guess} onChange={(e) => setGuess(e.target.value)}/>
                <button onClick={handleGuess}>Enter</button>
            </div>
            {isCorrect && <button onClick={handleNextLevel}>Next Level</button>}
            <ToastContainer/>
        </div>
    );
}

export default TomatoGame;
