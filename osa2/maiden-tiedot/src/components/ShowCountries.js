import Country from "./Country"
import SingleCountry from "./SingleCountry"

const ShowCountries = ({countries, setCountries}) => {
    

    if (countries.length < 10 && countries.length > 1) { 
        return(
    countries.map(country => console.log(country.languages) ||
        <div>
        <Country key={country.name} country={country}/>
        <Button key={country.latlng[0]} value={country} handleClick={()=> setCountries([country])} text="select"/>
        </div>
        )    
    )}
    else if (countries.length === 1) {
        let [c] = countries    
        return(
        <>
        <SingleCountry c={c} />
        </>
        )
    }
    else {
        
        return ( 
            <>Over 10 matches. Specify search.</>
        )
    }
}
const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
    )

export default ShowCountries