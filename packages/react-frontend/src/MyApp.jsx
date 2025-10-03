import React, {useState, useEffect} from "react";
import Table from "./table";
import Form from "./form";
import SearchBar from "./SearchBar"

  function MyApp() {

    const [characters, setCharacters] = useState([
    ]);

    const baseAPI = "http://localhost:8000";
    const fetchAPI = baseAPI + "/users/";
    const searchAPI = baseAPI + "/users";

    function fetchUsers(){
      const promise = fetch(fetchAPI);
      return promise;
    }

    function filterUsers(url){
      const promise = fetch(searchAPI + url)
      return promise;
    }

    function postUser(person){
      const promise = fetch(fetchAPI,{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(person)
      });
      return promise;
    }

    function deleteUser(id){
      const promise = fetch(fetchAPI + id,{
        method: "DELETE",
        headers: {
          "Content-Type" : "application/json",
        }
      })
      return promise;
    }

    useEffect(() => {
      getUsers();
    }, [] );

    function removeOneCharacter(id) {
      deleteUser(id).
      then(() => setCharacters([...characters]))
      .then(() => getUsers())
      .catch((error) => console.log(error))
    }

    function getUsers(){
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }

    function searchUsers(url){
      filterUsers(url)
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
    }

    function searchList(search) {
      let url = "?"
      if (search["name"] != ""){
        url += "name=" + search["name"];
      }
      if(url!= "?" && search["job"] != ""){
        url += "&job=" + search["job"];
      }else if(search["job"] != ""){
        url += "job=" + search["job"];
      }
      searchUsers(url)
    }

    function updateList(person) { 
      postUser(person)
        .then(() => getUsers())
        .catch((error) => {
          console.log(error);
        })
  }

    return (
        <div className="container">
          <SearchBar handleSubmit = {searchList}/>
          <Table 
          characterData={characters} 
          removeOneCharacter={removeOneCharacter}/>
          <Form handleSubmit = {updateList}/>
        </div>
      );
  }
export default MyApp;