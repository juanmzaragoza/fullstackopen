import React from 'react'
import Country from './Country'
import Button from './Button'

const Countries = ({ countries, handleSelectCountry }) => {

    if ( countries.length > 10 ){
        console.log("more than 10")
        return <div>Too many matches, specify another filter</div>
    } else if ( countries.length === 1 ) {
        console.log("1 result")
        const country = countries[0];
        return <Country country={country} />
    } else if ( countries.length >= 1 && countries.length <= 10 ) {
        console.log("between 1 and 10")
        return <div>
            {countries.map(country => <p key={country.fifa}>{country.name.common} <Button text="show" handleClick={() => handleSelectCountry(country)}/></p>)}
        </div>
    }

    return <div></div>
}

export default Countries