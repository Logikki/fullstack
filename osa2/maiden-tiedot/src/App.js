import { useState, useEffect } from "react"
import FilterView from './components/FilterView'
import ShowCountries from "./components/ShowCountries"
import axios from 'axios'

const App = () =>{
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
   axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  },[])
  
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    console.log(event.target.value)
    if (newSearch) {
    const regex = new RegExp(event.target.value, 'i')
    
    const filtteroitu = allCountries.filter(country => country.name.match(regex))
    setCountries(filtteroitu)
    }
  }

  return (
    <>
    <FilterView value={newSearch} handleChange={handleSearchChange} />
    <ShowCountries countries={countries} setCountries={setCountries} />
    </>
  )
}

export default App