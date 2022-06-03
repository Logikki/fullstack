import Henkilo from "./Henkilo"

const ShowPersons = ({persons, haku}) => {
    if (haku=='') { 
        return(
    persons.map(person =>
        <Henkilo key={person.name} person={person}/>
        )    
    )}
    else {
        var filtteroitu = persons.reduce(function(result, option) {
            if (option.name.includes(haku)) {
              return result.concat(option);
            }
            return result;
          }, []);

        console.log(filtteroitu)
        return (    
            filtteroitu.map(person => 
                <Henkilo key={person.name} person={person}/>
                )
                )}
    }


export default ShowPersons