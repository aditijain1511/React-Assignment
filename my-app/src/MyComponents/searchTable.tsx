import React, { useState } from "react";
import "./searchTable.css";
import Pagination from "@mui/material/Pagination";

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
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      setIsSearchClicked(true);
      setCurrentPage(1);
    } catch (error) {
      setError(error.message);
    }
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="search">
      <br />
      <br />
      <br />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter character name"
        data-testid="searchCharacter"
      />
      <button onClick={handleSearch} data-testid="searchBtn">
        Search
      </button>
      <br />
      <br />
      <br />
      <br />
      {error && <p>Error: {error}</p>}

      {searchResults.length === 0 && (
        <h1 style={{ backgroundColor: "lightblue", textAlign: "center" }}>
          Please enter the character name !!
        </h1>
      )}

      {isSearchClicked && searchResults.length > 0 && (
        <div>
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
              {currentItems.map((character) => (
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
          <div className="pagination-container">
            <Pagination
              count={Math.ceil(searchResults.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchTable;
