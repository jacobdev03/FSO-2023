import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ stat, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {stat}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good + neutral + bad) / 3;
  const positive = (good / (good + neutral + bad)) * 100;
  if (all === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" stat={good} />
          <StatisticLine text="neutral" stat={neutral} />
          <StatisticLine text="bad" stat={bad} />
          <StatisticLine text="all" stat={all} />
          <StatisticLine text="average" stat={average} />
          <StatisticLine text="positive" stat={positive} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };
  return (
    <div>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
