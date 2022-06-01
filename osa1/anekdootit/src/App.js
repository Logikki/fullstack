import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const initialState = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(initialState)
  const [maximi, setMax] = useState(0)

  const selectAnekdote = () => {
    //otetaan satunnainen luku väliltä 0-taulukon koko-1 
    const maxNumber = anecdotes.length
    setSelected(Math.floor(Math.random()*maxNumber))
  }

  const voteAnecdote = () => {
        const copy = { ...points }
    //kasvatetaan äänestetyn pisteitä yhdellä
    copy[selected] += 1
    setPoint(copy)
    if (copy[selected] > copy[maximi] ) {
      setMax(selected)
    }
    
  }


  return (
    <>
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <ShowPoints points={points[selected]} />
    </div>
    <div>
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={selectAnekdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      {anecdotes[maximi]}
      <ShowPoints points={points[maximi]} /> 
    </div>
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

const ShowPoints = ( { points } ) => {
  return (
    <div>
    has {points} votes
    </div>
  )
}


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App
