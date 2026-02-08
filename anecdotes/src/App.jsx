import { useState } from 'react'

const Boutton = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text} </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ]

  const [selected, setSelected] = useState(0)
  // enregistrer les clics de chaque bouton dans un \'etat diff \'erent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [votes, setVotes] = useState({ 0: 1, 1: 3, 2: 4, 3: 2 })

  const voteAnecdote = (id) => {
    const copy = { ...votes } // faire une copie de l’état
    copy[id] += 1 // modifier la copie
    setVotes(copy) // mettre à jour l’état
  }

  const handleGoodclick = () => {
    setGood(good + 1)
  }

  const handleNeutralclick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadclick = () => {
    setBad(bad + 1)
  }

  // Fonction pour trouver l'anecdote avec le plus de votes
  const getMostVotedAnecdote = () => {
    let maxVotes = 0
    let maxIndex = 0

    Object.keys(votes).forEach((key) => {
      if (votes[key] > maxVotes) {
        maxVotes = votes[key]
        maxIndex = Object.keys(votes).indexOf(key)
      }
    })

    return {
      anecdote: anecdotes[maxIndex],
      votes: maxVotes,
    }
  }

  const mostVoted = getMostVotedAnecdote()

  return (
    <div>
      <h1>Anecdote du jour</h1>
      <p>
        {anecdotes[selected]} has {votes[selected]} votes
      </p>
      <Boutton handleClick={() => voteAnecdote(selected)} text='vote' />
      <Boutton
        handleClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
        text='next anecdote'
      />
      <h1>L'anecdote la plus votée</h1>
      <p>{mostVoted.anecdote}</p>
      <p>Votes: {mostVoted.votes}</p>
      <h1>Feedback</h1>
      <Boutton handleClick={() => handleGoodclick()} text='good' />
      <Boutton handleClick={() => handleNeutralclick()} text='neutral' />
      <Boutton handleClick={() => handleBadclick()} text='bad' />
      <h1>Statistique</h1>
      {good + neutral + bad > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>no feedback given</p>
      )}
    </div>
  )
}

export default App
