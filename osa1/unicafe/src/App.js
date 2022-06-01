import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handeBadClick = () => {
    setBad(bad + 1)
  }
  const all = bad + good + neutral
  const average = good/all
  const positive = (good/(bad+good))*100 + '%'
  const stats = [all,average,positive, good, bad, neutral]

  return (
    <div>
      <div>
        <Header text="Give Feedback" />
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handeBadClick} text="bad" />
        <Statistics stats={stats} />
        
      </div>
      <div>

      </div>
    </div>
  )
}

const Statistics = ({stats}) => {

  const all = stats[0]
  const average = stats[1]
  const positive = stats[2]
  const good = stats[3]
  const bad = stats[4]
  const neutral = stats[5]

  if (all !== 0 ) {
  return ( 
    <>
        <Header text="statistics" />
        <table>
        <StatisticLine text="good" val={good} />
        <StatisticLine text="neutral" val={neutral} />
        <StatisticLine text="bad" val={bad} />
        <StatisticLine text="all" val={all} />
        <StatisticLine text="average" val={average}  />
        <StatisticLine text="positive" val={positive} />
        </table>
        </>
  )

  }
  return (
    <>
    <Header text="statistics" />
    </>
  )

}

const StatisticLine = ({text, val}) => {
  return (
    <>
    <tbody>
    <tr><td>{text}</td><td>{val}</td></tr>
      </tbody>
    </>
  )
}

const Header = ({text}) => {
  return (
    <>
    <h1>
      {text}
    </h1>
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App