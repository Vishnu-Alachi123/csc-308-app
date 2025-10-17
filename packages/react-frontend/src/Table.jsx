import React from "react";

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody(props) {
    console.log(props.characterData)
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row._id}</td>
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>
            <button onClick={() => props.removeOneCharacter(row._id)}>
                Delete
            </button>
          </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }
  
  function Table(props) {
      return (
        <div>
          <h1>Table</h1>
        <table>
          <TableHeader />
          <TableBody 
          characterData={props.characterData}
          removeOneCharacter={props.removeOneCharacter} />
        </table>
        </div>
      );
  }
  export default Table;
  


