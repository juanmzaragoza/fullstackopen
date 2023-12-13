import React, { useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
    const [ filterText, setFilterText ] = useState('')
    const [ countries, setCountries ] = useState([])

    const handleFilter = (event) => {
        const text = event.target.value
        console.log("filter", text)
        setFilterText(text)
        axios
            .get(`https://restcountries.com/v3.1/name/${text}`)
            .then(response => {
                console.log('promise fulfilled', response)
                setCountries(response.data);
            })
            .catch(error => {
                setCountries([])
            })
    }

    return <div>
        <Filter label={'find countries'} filterText={filterText} handleFilter={handleFilter} />
        <Countries countries={countries} handleSelectCountry={(country) => setCountries([country])} />
    </div>
}

export default App