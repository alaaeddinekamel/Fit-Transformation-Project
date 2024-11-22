// App.js
import React, { useState } from 'react';
import axios from 'axios';
import Quiz from './Quiz';
import Results from './Results';


function TestQuiz() {
  const [userDetails, setUserDetails] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const fetchWorkoutPlan = async (goal) => {
    try {
      const response = await axios.get('https://gym-fit.p.rapidapi.com/v1/exercises/search?number=50&offset=0', {
        headers: {
            'X-RapidAPI-Key': 'd14bc3a76emsh7da5852fd5546ffp10d7bbjsn6fa0e290b06f', // Replace with your RapidAPI key
            'X-RapidAPI-Host': 'gym-fit.p.rapidapi.com'
          },
      });

      // Filter exercises based on user goal
      const workoutPlan = response.data.results.slice(0, 8); // Get the first 5 exercises
      return workoutPlan;
    } catch (error) {
      console.error("Error fetching workout plan:", error);
      return [];
    }
  };

  const fetchDietPlan = async ({ age, weight, height, goal }) => {
    try {
      const response = await axios.get('https://gym-fit.p.rapidapi.com/v1/calculator/bmr', {
        headers: {
            'X-RapidAPI-Key': 'd14bc3a76emsh7da5852fd5546ffp10d7bbjsn6fa0e290b06f',
            'X-RapidAPI-Host': 'gym-fit.p.rapidapi.com'
        },
      
        params: {
            weight: weight,
            height: height,
            gender: 'male', // Modifier si le genre est fourni par l'utilisateur
            age: age
        } // Adjust as needed
      });

      const bmr = response.data.result;
      const calorieTarget = goal === 'lose_weight' ? bmr * 0.8 : goal === 'build_muscle' ? bmr * 1.2 : bmr;

      return { calories: Math.round(calorieTarget), bmr };
    } catch (error) {
      console.error("Error fetching diet plan:", error);
      return { calories: 0, bmr: 0 };
    }
  };

  const getRecommendations = async (details) => {
    const workoutPlan = await fetchWorkoutPlan(details.goal);
    const dietPlan = await fetchDietPlan(details);

    setRecommendations({
      workoutPlan,
      dietPlan
    });
  };

  return (
    <div className="App">
      {recommendations ? (
        <Results recommendations={recommendations} />
      ) : (
        <Quiz setUserDetails={(details) => {
          setUserDetails(details);
          getRecommendations(details);
        }} />
      )}
    </div>
  );
}

export default TestQuiz;
