import { useState } from 'react'
import FilterView from './components/FilterView'
import ShowPersons from './components/ShowPersons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = { 
      name : newName, 
      number : newNumber}

    const found = persons.map(person => person.name === newName) //tehdään booleanlista onko vastaavaa niemä
    console.log(found)

    // jos ei ole listassa lisätään listaan
    if (!found.includes(true)) { 
    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
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
        <ShowPersons persons={persons} haku={newSearch} />
      </div>
    </div>
  )

}

export default App