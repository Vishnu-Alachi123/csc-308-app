import React, {useState} from "react";

function SearchBar(props) {

    const [search,setSearch] = useState({
        name: "",
        job: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "job")
          setSearch({ name: search["name"], job: value });
        else setSearch({ name: value, job: search["job"] });
    }

    function submitForm() { 
        props.handleSubmit(search);
        setSearch({name:"", job:"" });
    }


    return (
        <div
            ><h1>Search Bar</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input 
                type="text"
                name="name"
                id="name"
                value={search.name}
                onChange={handleChange}>
                </input>
                <label htmlFor="job">Job</label>
                <input 
                type="text"
                name="job"
                id="job"
                value={search.job}
                onChange={handleChange}>
                </input>
                <input type="button" value="Submit" onClick={submitForm} />
                <input type="button" value="Reset" onClick={submitForm}/>
            </form>
        </div>
        )
}
export default SearchBar;