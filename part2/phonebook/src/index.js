import './index.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personsService from './services/persons'

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

const Persons = ({ persons, handleOnDelete }) => {
  return persons.map(person => <Person key={person.name} person={person} handleOnDelete={() => handleOnDelete(person)} />)
}

const Person = ({ person, handleOnDelete }) => {
  return <div>{person.name} {person.number} <button onClick={handleOnDelete}>delete</button></div>
}

const Notification = ({ message, classRoot }) => {
  console.log("message, classRoot", message, classRoot)
  if (message === null) {
    return null
  }

  return (
    <div className={classRoot}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filtered, setFiltered ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled', initialPersons)
        setPersons(initialPersons)
        setFiltered(initialPersons)
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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one`)) {
        personsService
          .update(duplicatedPerson.id, {...duplicatedPerson, number: newPhoneNumber})
          .then(updatedPerson => {
            const updatedPersons = persons
              .map(filteredPerson => (filteredPerson.id !== updatedPerson.id)? filteredPerson : updatedPerson)
            setPersons(updatedPersons)
            setNewName('')
            setNewPhoneNumber('')
            setFiltered(updatedPersons)

            setSuccessMessage(
              `Updated ${updatedPerson.name}`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
      }
    } else {
      const person = {
        name: newName,
        number: newPhoneNumber
      }
      personsService
        .create(person)
        .then(createdPerson => {
          const updatedPersons = persons.concat(createdPerson)
          setPersons(updatedPersons)
          setNewName('')
          setNewPhoneNumber('')
          setFilterText('')
          setFiltered(updatedPersons)

          setSuccessMessage(
            `Added ${createdPerson.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const handleOnDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .delete(person.id)
        .then(deletedPerson => {
          const updatedPersons = persons.filter(filteredPerson => filteredPerson.id !== person.id)
          setPersons(updatedPersons)
          setFiltered(updatedPersons)
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${person.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          const updatedPersons = persons.filter(filteredPerson => filteredPerson.id !== person.id)
          setPersons(updatedPersons)
          setFiltered(updatedPersons)
        })
    }
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
      <Notification message={successMessage} classRoot={"success"} />
      <Notification message={errorMessage} classRoot={"error"} />
      <Filter filterText={filterText} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newPhoneNumber={newPhoneNumber}
        handleNameChange={handleNameChange} 
        handlePhoneNumberChange={handlePhoneNumberChange} 
        addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={filtered} handleOnDelete={handleOnDelete} />
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))