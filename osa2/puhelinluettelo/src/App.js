import { useState, useEffect } from 'react'
import FilterView from './components/FilterView'
import ShowPersons from './components/ShowPersons'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import numberService from './services/numbers'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleRemOf =(id)=> {
      const filtered = persons.filter((person)=>person.id != id)
      console.log("moi" + filtered)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = { 
      name : newName, 
      number : newNumber}

    const found = persons.map(person => person.name === newName) //tehdään booleanlista onko vastaavaa niemä
    
    // jos ei ole listassa lisätään listaan
    if (!found.includes(true)) { 
      numberService
      .create(personObj)
      .then(returnedNumber => {
        setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
      })
    
    }
    else {
    alert(`${newName} is already added to phonebook`)
    }
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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