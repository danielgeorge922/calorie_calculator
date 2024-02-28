import React, { useState } from 'react';

function calculate_calories(gender: string, age: number, height: number, weight: number, activityLevel: number) {
  // const ACTIVITY_LEVELS = [1.2, 1.55, 1.725];
  let BMR = 0;

  if (gender === 'Male') {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 'Female') {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  } else if (gender === 'Other') {
    BMR = 10 * weight + 6.25 * height - 5 * age - 80;
  }

  BMR *= activityLevel;
  BMR = Math.round(BMR);

  return BMR;
}

function calculate_weightloss( calculated_calories: number,desired_amount: number){
  let amount = 0
  amount = (calculated_calories * 7 - 3500 * desired_amount) / 7
  amount = Math.round(amount);
  return amount
}

function ListGroup() {
  const initialFormData = {
    gender: '',
    age: 0,
    height: 0,
    weight: 0,
    activityLevel: 0,
  };
  const [gender, setGender] = useState(''); // State for gender
  const [age, setAge] = useState(0); // State for age
  const [height, setHeight] = useState(0); // State for height
  const [weight, setWeight] = useState(0); // State for weight
  const [activityLevel, setActivityLevel] = useState<number>(0); // State for activity level
  const [desiredWeightLoss, setDesiredWeightLoss] = useState<number>(0);
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(null); // State for calculated calories
  const [caloriesForWeightLoss, setCaloriesForWeightLoss] = useState<number | null>(null); // State for calculated calories for weight loss
  const [showResultPage, setShowResultPage] = useState(false); // State to control whether to show the result or input form.


  const handleCalculate = () => {
    // Calculate calories and store the result
    if (gender === '' || age === 0 || height === 0 || weight === 0 || activityLevel === 0  || age === null || height === null || weight === null) {
      alert('Please fill in all the fields and select an activity level.');
      return;
    }
    const result = calculate_calories(gender, age, height, weight, activityLevel);
    setCalculatedCalories(result);
    setShowResultPage(true);

    const weightLossCalories = calculate_weightloss(result, desiredWeightLoss);
    setCaloriesForWeightLoss(weightLossCalories);
  };

  const handleDesiredWeightLossChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Update the desired weight loss and calculate calories for weight loss
    const selectedValue = parseFloat(e.target.value);
    setDesiredWeightLoss(selectedValue);

    // Calculate calories required for weight loss
    const weightLossCalories = calculate_weightloss(calculatedCalories as number, selectedValue);
    setCaloriesForWeightLoss(weightLossCalories);
  };

  const handleGoBack = () => {
    setShowResultPage(false);
  };

  const handleReset = () => {
    // Reset all prompts to their default values
    setGender('');
    setAge(0);
    setHeight(0);
    setWeight(0);
    setActivityLevel(0);
    setDesiredWeightLoss(0);
    setCalculatedCalories(null);
    setShowResultPage(false);
  };

  return (



    <div className="container-lg mt-8">
      <div className="bg-black p-4 rounded">
      <h1 className="text-center font-weight-bold  text-white">Calorie Calculator</h1>

        </div>

      {showResultPage ? (

        <div className="text-center">

          <h2 className = "text-bg-light text-danger">Your calculated calories are</h2>

          <div className="container mt-1000">
          <h3 className="text-black">{calculatedCalories} calories</h3>
          </div>
          {/* Dropdown for desired weight loss per week */}
          <div className="form-group">
            <label>Desired Weight Loss per Week:</label>
            <p className="mt-2"></p>
            <select
              className="form-control"
              value={desiredWeightLoss}
              // onChange={(e) => setDesiredWeightLoss(parseFloat(e.target.value))}
                onChange={handleDesiredWeightLossChange}

            >
              <option value={0}>Select Weight Loss</option>
              <option value={0.5}>0.5 pounds per week</option>
              <option value={1}>1 pound per week</option>
              <option value={1.5}>1.5 pounds per week</option>
              <option value={2}>2 pounds per week</option>
            </select>


            <div className="mt-3">
          <p className="mt-2">Calories required to achieve this goal</p>
              <input
            type="text"
            className="form-control bold-text"
            value={caloriesForWeightLoss !== null ? caloriesForWeightLoss : ''}
            readOnly
          />

              <p className="mt-2"></p>
              <p className="mt-2"></p>
              <p className="mt-2"></p>
              <p className="mt-2"></p>

        </div>
          </div>

          <button className="btn btn-danger" onClick={handleGoBack}>
            Go Back
          </button>
        </div>

      ) : (
        <form>
          <div className="form-group">
            <label>Gender:</label>
            <select
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
            <p>(Minimum: 15, Maximum: 80)</p>
          </div>

          <div className="form-group">
            <label>Height (inches):</label>
            <input
              type="number"
              className="form-control"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Weight:</label>
            <input
              type="number"
              className="form-control"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Activity Level:</label>
            <select
              className="form-control"
              value={activityLevel}
              onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
            >
              <option value={0}>Select Activity Level</option>
              <option value={1.2}>Low</option>
              <option value={1.55}>Moderate</option>
              <option value={1.725}>High</option>
            </select>
          </div>
          <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-success mt-3 mx-auto"
            onClick={handleCalculate}
          >
            Calculate Calories
          </button>
             <button
              type="button"
              className="btn btn-secondary mt-3 mx-2"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>

  );
}

export default ListGroup;


