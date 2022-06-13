import Country from "./Country"

const ShowCountries = ({countries}) => {
    
    if (countries.length < 10 && countries.length > 1) { 
        return(
            <>moro</>,
    countries.map(country => console.log(country.languages) ||
        <Country key={country.name} country={country}/>
        )    
    )}
    else if (countries.length === 1) {
        let [c] = countries
        let flagURL = c.flags.png
        console.log(flagURL)
        return (
            <>
            <h2>{c.name}</h2>
            <p>Capital {c.capital} </p>
            <p>Area {c.area} </p>
            <h3>Languages</h3>
            
            <ul>
            {c.languages.map(l => 
                    <li key={l.name}> {l.name} </li>
                )}
            </ul>
            <img src={flagURL} alt="lippu" />

            </>

            )
    }
    else {
        
        return ( 
            <>Over 10 matches. Specify search.</>
        )
    }
}


export default ShowCountries