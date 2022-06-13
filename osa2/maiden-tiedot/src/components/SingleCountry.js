import Weather from "./Weather"


const SingleCountry = ({c}) => {    
       
            let flagURL = c.flags.png
          
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
            <Weather c = {c} />
            </>

            )
        }

export default SingleCountry