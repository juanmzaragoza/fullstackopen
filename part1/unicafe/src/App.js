import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
)

const Statics = ({ good, neutral, bad}) => {

  const countTotal = () => good + neutral + bad
  const getAverage = () => (good * 1 + bad * -1) / countTotal()
  const getPositivePercentage = () => (good / countTotal() * 100) + " %"

  if(!countTotal()) {
    return <div>
      <h1>statics</h1>
      <div>No feedback given</div>
    </div>
  }

  return (
    <div>
      <h1>statics</h1>
      <table>
        <tbody>
        <StatisticLine label="good" value={good} />
        <StatisticLine label="neutral" value={neutral} />
        <StatisticLine label="bad" value={bad} />
        <StatisticLine label="all" value={countTotal()} />
        <StatisticLine label="average" value={getAverage()} />
        <StatisticLine label="positive" value={getPositivePercentage()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Statics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
