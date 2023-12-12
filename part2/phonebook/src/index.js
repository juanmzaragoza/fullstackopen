import React, { useState } from 'react'
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filtered, setFiltered ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

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