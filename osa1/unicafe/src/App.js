import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

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
//   const handleLeftClick = () =>
//   setClicks({ ...clicks, left: clicks.left + 1 })

// const handleRightClick = () =>
//   setClicks({ ...clicks, right: clicks.right + 1 })


  return (
    <div>
      <div>
        <Header text="Give Feedback" />
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handeBadClick} text="bad" />
        <Header text="statistics" />
        <Stat text="good" val={good} />
        <Stat text="neutral" val={neutral} />
        <Stat text="bad" val={bad} />
      </div>
      <div>

      </div>
    </div>
  )
}

const Stat = ({text, val}) => {
  return (
    <>
      <p>
        {text} {val}
      </p>
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

export default App