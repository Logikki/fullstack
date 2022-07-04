import { useState, useEffect } from 'react'
import FilterView from './components/FilterView'
import ShowPersons from './components/ShowPersons'
import PersonForm from './components/PersonForm'
import numberService from './services/numbers'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  //poisto
  const handleRemOf =(id)=> {
    if (window.confirm(`are you sure you want to delete person ${id}`)) {
      numberService
        .rem(id)
        .then(response => { // ei tehdä tällä mitään
          const filtered = persons.filter((person)=>person.id !== id)
          setPersons(filtered)
  })
  setErrorMessage(
    `Deleted person with id ${id}`
  )
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
}

}

  useEffect(() => {
    console.log('effect')
    numberService
    .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])
  

  const addPerson = (event) => {
    event.preventDefault()
    
    const found = persons.map(person => person.name === newName) //tehdään booleanlista onko vastaavaa niemä
    
    // jos ei ole listassa lisätään listaan. 
    if (!found.includes(true)) {
      const personObj = { 
        id : Math.floor(Math.random() * 1000), //random id väliltä 0 < 1000
        name : newName, 
        number : newNumber}

      numberService
      .create(personObj)
      .then(returnedNumber => {
        setPersons(persons.concat(personObj))
        setErrorMessage(
          `Added ${personObj.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    setNewName('')
    setNewNumber('')
      })
    }
    //muokataan vanhaa 
    else if (window.confirm(`${newName} already added to phonebook, replace old number with new one?`)) {
      changePerson()
    }
  }
  
  const changePerson = () => {
    const person = persons.find(p => p.name === newName)
      console.log("sama henkilo on: " + JSON.stringify(person))

      const changedPerson = {...person, number : newNumber}
      numberService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
          setErrorMessage(
            `Modfied ${person.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Person '${person.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== newName))
        })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <FilterView newSearch={newSearch} handleSearchChange={handleSearchChange} />
        <h2>add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
        handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}
        />
      <h2>Numbers</h2>
      <div>
        <ShowPersons persons={persons} haku={newSearch} handleRemOf={handleRemOf} />
      </div>
    </div>
  )

}

export default App