import React, {useState} from "react";
import Table from "./table";
import Form from "./form";

  function MyApp() {

    const [characters, setCharacters] = useState([
        {
          name: "Charlie",
          job: "Janitor"
        },
        {
          name: "Mac",
          job: "Bouncer"
        },
        {
          name: "Dee",
          job: "Aspring actress"
        },
        {
          name: "Dennis",
          job: "Bartender"
        }
    ]);

    function removeOneCharacter(index) {
        const updated = characters.filter((characters, i) => {
            return i != index;
        });
        setCharacters(updated)
    }

    function updateList(person){
        setCharacters([...characters, person]);
    }

    return (
        <div className="container">
          <Table 
          characterData={characters} 
          removeOneCharacter={removeOneCharacter}/>
          <Form handleSubmit = {updateList}/>
        </div>
      );
  }
export default MyApp;