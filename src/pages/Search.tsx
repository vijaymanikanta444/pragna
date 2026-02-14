import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      setSearchParams({ q: trimmedQuery });
    } else {
      setSearchParams({});
    }
    // TODO: Implement search results rendering
    console.log("Searching for:", trimmedQuery);
  };

  return (
    <section className="search-page">
      <div className="search-page-header">
        <h1>Search</h1>
        <p>Find articles across Pragna.</p>
      </div>

      <form className="search-page-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="search-page-input"
        />
        <button type="submit" className="search-page-btn" aria-label="Search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Search</span>
        </button>
      </form>

      <div className="search-results">
        {searchParams.get("q") ? (
          <p className="search-results-label">
            Showing results for <strong>{searchParams.get("q")}</strong>
          </p>
        ) : (
          <p className="search-results-label">Start typing to search.</p>
        )}
        <div className="search-results-placeholder">
          Search results will appear here.
        </div>
      </div>
    </section>
  );
}
