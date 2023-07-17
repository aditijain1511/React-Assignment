import React, { useState } from "react";
import "./searchTable.css";

interface ApiResponse {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

function SearchTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ApiResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?name=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSearchResults(data.results);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="search">
      <br></br>
      <br></br>
      <br></br>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter character name"
        data-testid="searchCharacter"
      />
      <button onClick={handleSearch} data-testid="searchBtn">Search</button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {error && <p>Error: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
            <th>Species</th>
            <th>Gender</th>
            <th>Type</th>
            <th>Origin</th>
            <th>Location</th>
            <th>Image</th>
            <th>Episode</th>
            <th>URL</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((character) => (
            <tr key={character.id}>
              <td>{character.id}</td>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
              <td>{character.gender}</td>
              <td>{character.type}</td>
              <td>{character.origin.name}</td>
              <td>{character.location.name}</td>
              <td>
                <img src={character.image} alt={character.name} />
              </td>
              <td>{character.episode[0]}</td>
              <td>{character.url}</td>
              <td>{character.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchTable;
