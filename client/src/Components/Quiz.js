// Quiz.js
import React, { useState } from 'react';

const Quiz = ({ setUserDetails }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserDetails({
      age,
      weight,
      height,
      goal,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        How old are you?
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </label>

      <label>
        What is your weight? (kg)
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </label>

      <label>
        What is your height? (cm)
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
      </label>

      <label>
        What is your goal?
        <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
          <option value="">Select a goal</option>
          <option value="lose_weight">Lose Weight</option>
          <option value="build_muscle">Build Muscle</option>
          <option value="maintain">Maintain</option>
        </select>
      </label>

      <button type="submit">Get My Plan</button>
    </form>
  );
};

export default Quiz;
