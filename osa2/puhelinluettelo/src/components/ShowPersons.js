import Henkilo from "./Henkilo"

const ShowPersons = ({persons, haku, handleRemOf}) => {
    

    if (haku=='') { 
        return(
    persons.map(person =>
        <div>
        <Henkilo key={person.name} person={person}/>
        </div>
        )    
    )}
    else {
        var filtteroitu = persons.reduce(function(result, option) {
            if (option.name.toLowerCase().includes(haku.toLowerCase())) {
              return result.concat(option);
            }
            return result;
          }, []);

        console.log(filtteroitu)
        return (    
            filtteroitu.map(person => 
                <Henkilo key={person.id} person={person} handleClick={()=>handleRemOf(person.id)}/>
                )
                )}
    }


export default ShowPersons