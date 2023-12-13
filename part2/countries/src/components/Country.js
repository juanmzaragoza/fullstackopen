import React from 'react'
import Weather from './Wheather'

const Country = ({ country }) => {
    return <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>Spoken languages</h2>
        <ul>
            {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <Weather country={country}/>
    </div>
}

export default Country