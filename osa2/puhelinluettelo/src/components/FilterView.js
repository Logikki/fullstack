const FilterView = (props) => 
    <div>
        filter shown with <input 
        value={props.newSearch}
        onChange={props.handleSearchChange}/>
    </div>

export default FilterView