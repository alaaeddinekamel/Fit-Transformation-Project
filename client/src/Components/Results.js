// Results.js
import React from 'react';

const Results = ({ recommendations }) => {
  return (
    <div className="results">
      <h2>Your Personalized Plan</h2>

      <h3>Workout Plan</h3>
      <ul>
        {recommendations.workoutPlan.map((exercise, index) => (
          <li key={index}>{exercise.name}</li>
        ))}
      </ul>

      <h3>Diet Plan</h3>
      <p><strong>Daily Caloric Intake:</strong> {recommendations.dietPlan.calories} kcal</p>
      <p><strong>BMR:</strong> {recommendations.dietPlan.bmr} kcal</p>
    </div>
  );
};

export default Results;
