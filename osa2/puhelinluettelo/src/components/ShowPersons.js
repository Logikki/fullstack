import Henkilo from "./Henkilo"

const ShowPersons = ({persons, haku, handleRemOf}) => {
    

    if (haku=='') { 
        return(
    persons.map(person =>
        <Henkilo key={person.id} person={person} handleClick={()=>handleRemOf(person.id)}/>
        )    
    )}
    else {
        var filtteroitu = persons.reduce(function(result, option) {
            if (option.name.toLowerCase().includes(haku.toLowerCase())) {
              return result.concat(option);
            }
            return result;
          }, []);

        
        return (    
            filtteroitu.map(person => 
                <Henkilo key={person.id} person={person} handleClick={()=>handleRemOf(person.id)}/>
                )
                )}
    }


export default ShowPersons