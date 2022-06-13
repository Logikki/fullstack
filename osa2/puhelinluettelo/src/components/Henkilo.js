const Henkilo = ( {person, handleClick} ) =>

    <div>
        {person.name} {person.number}
    <button onClick={handleClick}>delete</button>
    </div>


export default Henkilo