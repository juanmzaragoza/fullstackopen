import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

const Filter = ({ filterText, handleFilter }) => {
  return (
    <div>
      filter shown with: <input value={filterText} onChange={handleFilter} />
    </div>
  )
}

const PersonForm = ({ newName, newPhoneNumber, handleNameChange, handlePhoneNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return persons.map(person => <Person key={person.name} person={person} />)
}

const Person = ({ person }) => {
  return <div>{person.name} {person.number}</div>
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filtered, setFiltered ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled', response)
        setPersons(response.data)
        setFiltered(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value)
    setNewPhoneNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const duplicatedPerson = persons.find(person => person.name === newName)
    if (duplicatedPerson) {
      return window.alert(`${newName} is already added to phonebook`)
    }
    const person = {
      name: newName,
      number: newPhoneNumber
    }
    const updatedPersons = persons.concat(person)
    setPersons(updatedPersons)
    setNewName('')
    setNewPhoneNumber('')
    setFilterText('')
    setFiltered(updatedPersons)
  }

  const handleFilter = (event) => {
    const name = event.target.value
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(name.toLowerCase()))
    console.log("filter", filteredPersons, name, persons)
    setFiltered(filteredPersons)
    setFilterText(name)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newPhoneNumber={newPhoneNumber}
        handleNameChange={handleNameChange} 
        handlePhoneNumberChange={handlePhoneNumberChange} 
        addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={filtered} />
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))