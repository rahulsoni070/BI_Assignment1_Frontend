// src/components/Header.js
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${query}`);
  };

  return (
    <nav className="navbar bg-light px-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand badge text-bg-info">
          <em>Meetup</em>
        </Link>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            style={{ minWidth: "250px" }}
            placeholder="Search by title and tags"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
